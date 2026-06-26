export async function init(canvas, config) {
  const THREE = await import('three');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(config.bgColor);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = config.cameraZ;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles
  const particleCount = config.particleCount;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    // Spread particles in a 3D bounding area
    positions[i * 3] = (Math.random() - 0.5) * 500;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 500;

    velocities.push({
      x: (Math.random() - 0.5) * 0.4,
      y: (Math.random() - 0.5) * 0.4,
      z: (Math.random() - 0.5) * 0.4
    });
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Particle Material
  const pMaterial = new THREE.PointsMaterial({
    color: config.colorPrimary,
    size: config.particleSize,
    transparent: true,
    opacity: 0.8
  });

  const particleSystem = new THREE.Points(particlesGeometry, pMaterial);
  scene.add(particleSystem);

  // Line connections
  const linesMaterial = new THREE.LineBasicMaterial({
    color: config.colorSecondary,
    transparent: true,
    opacity: config.connectOpacity
  });

  let linesMesh = null;

  // Floating Wireframe Golden Icosahedron
  const geomShape = new THREE.IcosahedronGeometry(45, 1);
  const wireframeGeom = new THREE.WireframeGeometry(geomShape);
  const wireframeMat = new THREE.LineBasicMaterial({ 
    color: config.colorPrimary,
    transparent: true,
    opacity: 0.6
  });
  const floatingShape = new THREE.LineSegments(wireframeGeom, wireframeMat);
  scene.add(floatingShape);

  // Base positions
  let shapeBaseX = 180;
  let shapeBaseY = 0;

  // Adjust floating shape position based on screen width
  const adjustPosition = () => {
    if (window.innerWidth < 768) {
      shapeBaseX = 0;
      shapeBaseY = -90;
      floatingShape.position.set(shapeBaseX, shapeBaseY, 0);
      floatingShape.scale.set(0.6, 0.6, 0.6);
    } else {
      shapeBaseX = 180;
      shapeBaseY = 0;
      floatingShape.position.set(shapeBaseX, shapeBaseY, 0);
      floatingShape.scale.set(1.1, 1.1, 1.1);
    }
  };
  adjustPosition();

  // Mouse Parallax variables
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const onMouseMove = (e) => {
    // Normalise mouse position relative to window center
    mouseX = (e.clientX - window.innerWidth / 2) * config.mouseParallax;
    mouseY = (e.clientY - window.innerHeight / 2) * config.mouseParallax;
  };
  window.addEventListener('mousemove', onMouseMove);

  // Handle Resize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    adjustPosition();
  };
  window.addEventListener('resize', onResize);

  // Animation Loop
  let animationFrameId;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    // Easing the mouse inputs
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // 1. Mouse Camera Parallax (Main viewport tilt)
    camera.position.x = targetX * 0.5;
    camera.position.y = -targetY * 0.5;
    camera.lookAt(scene.position);

    // 2. Layered Parallax: Shift shape and particles at different rates to create depth illusion
    // Particles shift slightly with cursor
    particleSystem.position.x = targetX * 0.15;
    particleSystem.position.y = -targetY * 0.15;

    // Shape drifts in the opposite direction for parallax offset
    floatingShape.position.x = shapeBaseX - targetX * 0.4;
    floatingShape.position.y = shapeBaseY + targetY * 0.4;

    // Connection lines and particle positions update
    const posArr = particlesGeometry.attributes.position.array;
    const linePositions = [];

    // Cursor influence in 3D (scale mouse target coordinates roughly to particle space)
    const cursor3DX = targetX * 1.5;
    const cursor3DY = -targetY * 1.5;
    const mouseInfluenceRadius = 120;
    const influenceStrength = 0.6;

    for (let i = 0; i < particleCount; i++) {
      // Base slow drift
      posArr[i * 3] += velocities[i].x + (Math.sin(Date.now() * config.driftSpeed + i) * 0.02);
      posArr[i * 3 + 1] += velocities[i].y + (Math.cos(Date.now() * config.driftSpeed + i) * 0.02);
      posArr[i * 3 + 2] += velocities[i].z;

      // Wrap-around boundary boundaries (-250 to 250)
      if (posArr[i * 3] > 250) posArr[i * 3] = -250;
      else if (posArr[i * 3] < -250) posArr[i * 3] = 250;

      if (posArr[i * 3 + 1] > 250) posArr[i * 3 + 1] = -250;
      else if (posArr[i * 3 + 1] < -250) posArr[i * 3 + 1] = 250;

      if (posArr[i * 3 + 2] > 250) posArr[i * 3 + 2] = -250;
      else if (posArr[i * 3 + 2] < -250) posArr[i * 3 + 2] = 250;

      // 3. Reacting to cursor coordinates (push away)
      const dx = posArr[i * 3] - cursor3DX;
      const dy = posArr[i * 3 + 1] - cursor3DY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouseInfluenceRadius) {
        const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
        posArr[i * 3] += (dx / (dist || 1)) * force * influenceStrength;
        posArr[i * 3 + 1] += (dy / (dist || 1)) * force * influenceStrength;
      }
    }

    particlesGeometry.attributes.position.needsUpdate = true;

    // Connect particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < config.connectionDist) {
          linePositions.push(
            posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2],
            posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]
          );
        }
      }
    }

    if (linesMesh) {
      scene.remove(linesMesh);
      linesMesh.geometry.dispose();
    }

    if (linePositions.length > 0) {
      const linesGeometry = new THREE.BufferGeometry();
      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
      scene.add(linesMesh);
    }

    // Slow rotation on floating shape
    floatingShape.rotation.x += 0.002;
    floatingShape.rotation.y += 0.003;

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    geomShape.dispose();
    wireframeGeom.dispose();
    wireframeMat.dispose();
    pMaterial.dispose();
    linesMaterial.dispose();
    particlesGeometry.dispose();
  };
}
