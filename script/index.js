const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {

        const btnDiv = document.createElement("div");

        btnDiv.innerHTML = `
        <button class="btn btn-outline btn-primary glow-on-hover">
            <i class="fa-solid fa-book-open"></i>
            Lesson-${lesson.level_no}
        </button>
        `;

        levelContainer.appendChild(btnDiv);
    }
}

loadLessons();





 //Three.js Animation Script 
        // Three.js Background Animation
        let scene, camera, renderer;
        let particles = [];
        let letters = [];
        
        // Initialize Three.js
        function initThreeJS() {
            // Create scene
            scene = new THREE.Scene();
            
            // Create camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;
            
            // Create renderer
            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('three-bg'),
                alpha: true,
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0); // Transparent background
            
            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            // Add directional light
            const directionalLight = new THREE.DirectionalLight(0x00BCFF, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
            
            // Create floating particles (English alphabet letters)
            createFloatingLetters();
            
            // Create background particles
            createBackgroundParticles();
            
            // Handle window resize
            window.addEventListener('resize', onWindowResize);
            
            // Start animation
            animate();
        }
        
        // Create floating English letters
        function createFloatingLetters() {
            const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const banglaLetters = 'অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ';
            
            // Load font for 3D text
            const loader = new THREE.FontLoader();
            
            // Create simple geometry for letters (we'll use cubes as placeholders)
            for (let i = 0; i < 50; i++) {
                let letter;
                let useEnglish = Math.random() > 0.5;
                
                if (useEnglish) {
                    // Create English letter
                    const char = englishLetters[Math.floor(Math.random() * englishLetters.length)];
                    letter = create3DLetter(char, 0x00BCFF);
                } else {
                    // Create Bangla letter
                    const char = banglaLetters[Math.floor(Math.random() * banglaLetters.length)];
                    letter = create3DLetter(char, 0x0072FF);
                }
                
                // Random position
                letter.position.x = (Math.random() - 0.5) * 50;
                letter.position.y = (Math.random() - 0.5) * 30;
                letter.position.z = (Math.random() - 0.5) * 50;
                
                // Random scale
                const scale = Math.random() * 0.5 + 0.2;
                letter.scale.set(scale, scale, scale);
                
                // Store for animation
                letters.push({
                    mesh: letter,
                    speed: Math.random() * 0.02 + 0.005,
                    amplitude: Math.random() * 0.5 + 0.2,
                    rotationSpeed: Math.random() * 0.02 - 0.01
                });
                
                scene.add(letter);
            }
        }
        
        // Create a simple 3D letter
        function create3DLetter(char, color) {
            // Create a simple geometry (cube with text texture would be better)
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
            const material = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.3,
                shininess: 100
            });
            
            const cube = new THREE.Mesh(geometry, material);
            
            // For now, we'll just use cubes. In a production environment,
            // you would use TextGeometry with a loaded font.
            return cube;
        }
        
        // Create background particles
        function createBackgroundParticles() {
            const particleCount = 200;
            const particleGeometry = new THREE.BufferGeometry();
            const particlePositions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i += 3) {
                particlePositions[i] = (Math.random() - 0.5) * 100;     // x
                particlePositions[i + 1] = (Math.random() - 0.5) * 60;   // y
                particlePositions[i + 2] = (Math.random() - 0.5) * 50;   // z
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                color: 0x00BCFF,
                size: 0.1,
                transparent: true,
                opacity: 0.5
            });
            
            const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particleSystem);
            
            // Store for animation
            particles.push({
                mesh: particleSystem,
                rotationSpeed: 0.001
            });
        }
        
        // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Animate floating letters
            letters.forEach((letterObj, index) => {
                const letter = letterObj.mesh;
                
                // Float up and down
                letter.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
                
                // Rotate
                letter.rotation.x += letterObj.rotationSpeed;
                letter.rotation.y += letterObj.rotationSpeed;
                
                // Move slightly
                letter.position.x += Math.sin(Date.now() * 0.0005 + index) * 0.005;
                letter.position.z += Math.cos(Date.now() * 0.0005 + index) * 0.005;
            });
            
            // Animate particles
            particles.forEach(particle => {
                particle.mesh.rotation.x += particle.rotationSpeed * 0.5;
                particle.mesh.rotation.y += particle.rotationSpeed;
            });
            
            // Render scene
            renderer.render(scene, camera);
        }
        
        // Initialize Three.js when page loads
        window.addEventListener('load', initThreeJS);
        
        // Add interactive effects to buttons
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.btn');
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    // Create a ripple effect
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple-effect');
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.backgroundColor = 'rgba(0, 188, 255, 0.3)';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple 0.6s linear';
                    ripple.style.width = '100px';
                    ripple.style.height = '100px';
                    ripple.style.left = '50%';
                    ripple.style.top = '50%';
                    ripple.style.marginLeft = '-50px';
                    ripple.style.marginTop = '-50px';
                    ripple.style.pointerEvents = 'none';
                    
                    this.appendChild(ripple);
                    
                    // Remove ripple after animation
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
            
            // Add CSS for ripple animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
            
            // Add hover effect to Get Started button
            const getStartedBtn = document.querySelector('.btn-primary');
            if (getStartedBtn) {
                getStartedBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Create particle explosion effect in Three.js
                    createButtonExplosion();
                    
                    // Show message
                    setTimeout(() => {
                        alert('Welcome to English Janala! Your learning journey begins now.');
                    }, 500);
                });
            }
        });
        
        // Create particle explosion for button click
        function createButtonExplosion() {
            const explosionParticles = [];
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const geometry = new THREE.SphereGeometry(0.1, 8, 8);
                const material = new THREE.MeshBasicMaterial({
                    color: 0x00BCFF,
                    transparent: true,
                    opacity: 0.8
                });
                
                const particle = new THREE.Mesh(geometry, material);
                
                // Position at center (camera position)
                particle.position.copy(camera.position);
                
                // Random velocity
                particle.velocity = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2
                );
                
                particle.life = 1.0;
                
                scene.add(particle);
                explosionParticles.push(particle);
            }
            
            // Animate explosion
            function animateExplosion() {
                for (let i = explosionParticles.length - 1; i >= 0; i--) {
                    const particle = explosionParticles[i];
                    
                    particle.position.add(particle.velocity);
                    particle.life -= 0.02;
                    particle.material.opacity = particle.life * 0.8;
                    
                    if (particle.life <= 0) {
                        scene.remove(particle);
                        explosionParticles.splice(i, 1);
                    }
                }
                
                if (explosionParticles.length > 0) {
                    requestAnimationFrame(animateExplosion);
                }
            }
            
            animateExplosion();
        }
    