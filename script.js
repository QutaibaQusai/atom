let scene, camera, renderer;
let protonMeshes = [], neutronMeshes = [], electrons = [], orbitLines = [];
let nucleusGroup;
let mouseX = 0, mouseY = 0;
let isRotating = true;

let atomData = {
    protons: 0,
    neutrons: 0,
    electrons: 0
};

const elements = [
    {symbol: 'H', name: 'هيدروجين'}, {symbol: 'He', name: 'هيليوم'}, {symbol: 'Li', name: 'ليثيوم'},
    {symbol: 'Be', name: 'بيريليوم'}, {symbol: 'B', name: 'بورون'}, {symbol: 'C', name: 'كربون'},
    {symbol: 'N', name: 'نيتروجين'}, {symbol: 'O', name: 'أكسجين'}, {symbol: 'F', name: 'فلور'},
    {symbol: 'Ne', name: 'نيون'}, {symbol: 'Na', name: 'صوديوم'}, {symbol: 'Mg', name: 'مغنيسيوم'},
    {symbol: 'Al', name: 'ألومنيوم'}, {symbol: 'Si', name: 'سيليكون'}, {symbol: 'P', name: 'فوسفور'},
    {symbol: 'S', name: 'كبريت'}, {symbol: 'Cl', name: 'كلور'}, {symbol: 'Ar', name: 'أرجون'},
    {symbol: 'K', name: 'بوتاسيوم'}, {symbol: 'Ca', name: 'كالسيوم'}, {symbol: 'Sc', name: 'سكانديوم'},
    {symbol: 'Ti', name: 'تيتانيوم'}, {symbol: 'V', name: 'فاناديوم'}, {symbol: 'Cr', name: 'كروم'},
    {symbol: 'Mn', name: 'منغنيز'}, {symbol: 'Fe', name: 'حديد'}, {symbol: 'Co', name: 'كوبالت'},
    {symbol: 'Ni', name: 'نيكل'}, {symbol: 'Cu', name: 'نحاس'}, {symbol: 'Zn', name: 'زنك'},
    {symbol: 'Ga', name: 'غاليوم'}, {symbol: 'Ge', name: 'جرمانيوم'}, {symbol: 'As', name: 'زرنيخ'},
    {symbol: 'Se', name: 'سيلينيوم'}, {symbol: 'Br', name: 'بروم'}, {symbol: 'Kr', name: 'كريبتون'},
    {symbol: 'Rb', name: 'روبيديوم'}, {symbol: 'Sr', name: 'سترونشيوم'}, {symbol: 'Y', name: 'إتريوم'},
    {symbol: 'Zr', name: 'زركونيوم'}, {symbol: 'Nb', name: 'نيوبيوم'}, {symbol: 'Mo', name: 'موليبدنوم'},
    {symbol: 'Tc', name: 'تكنيشيوم'}, {symbol: 'Ru', name: 'روثينيوم'}, {symbol: 'Rh', name: 'روديوم'},
    {symbol: 'Pd', name: 'بلاديوم'}, {symbol: 'Ag', name: 'فضة'}, {symbol: 'Cd', name: 'كادميوم'},
    {symbol: 'In', name: 'إنديوم'}, {symbol: 'Sn', name: 'قصدير'}, {symbol: 'Sb', name: 'إثمد'},
    {symbol: 'Te', name: 'تيلوريوم'}, {symbol: 'I', name: 'يود'}, {symbol: 'Xe', name: 'زينون'},
    {symbol: 'Cs', name: 'سيزيوم'}, {symbol: 'Ba', name: 'باريوم'}, {symbol: 'La', name: 'لانثانوم'},
    {symbol: 'Ce', name: 'سيريوم'}, {symbol: 'Pr', name: 'براسيوديميوم'}, {symbol: 'Nd', name: 'نيوديميوم'},
    {symbol: 'Pm', name: 'بروميثيوم'}, {symbol: 'Sm', name: 'ساماريوم'}, {symbol: 'Eu', name: 'يوروبيوم'},
    {symbol: 'Gd', name: 'غادولينيوم'}, {symbol: 'Tb', name: 'تربيوم'}, {symbol: 'Dy', name: 'ديسبروسيوم'},
    {symbol: 'Ho', name: 'هولميوم'}, {symbol: 'Er', name: 'إربيوم'}, {symbol: 'Tm', name: 'ثوليوم'},
    {symbol: 'Yb', name: 'إتيربيوم'}, {symbol: 'Lu', name: 'لوتيشيوم'}, {symbol: 'Hf', name: 'هافنيوم'},
    {symbol: 'Ta', name: 'تانتالوم'}, {symbol: 'W', name: 'تنغستن'}, {symbol: 'Re', name: 'رينيوم'},
    {symbol: 'Os', name: 'أوزميوم'}, {symbol: 'Ir', name: 'إريديوم'}, {symbol: 'Pt', name: 'بلاتين'},
    {symbol: 'Au', name: 'ذهب'}, {symbol: 'Hg', name: 'زئبق'}, {symbol: 'Tl', name: 'ثاليوم'},
    {symbol: 'Pb', name: 'رصاص'}, {symbol: 'Bi', name: 'بزموت'}, {symbol: 'Po', name: 'بولونيوم'},
    {symbol: 'At', name: 'أستاتين'}, {symbol: 'Rn', name: 'رادون'}, {symbol: 'Fr', name: 'فرنسيوم'},
    {symbol: 'Ra', name: 'راديوم'}, {symbol: 'Ac', name: 'أكتينيوم'}, {symbol: 'Th', name: 'ثوريوم'},
    {symbol: 'Pa', name: 'بروتكتينيوم'}, {symbol: 'U', name: 'يورانيوم'}, {symbol: 'Np', name: 'نبتونيوم'},
    {symbol: 'Pu', name: 'بلوتونيوم'}, {symbol: 'Am', name: 'أمريسيوم'}, {symbol: 'Cm', name: 'كوريوم'},
    {symbol: 'Bk', name: 'بركيليوم'}, {symbol: 'Cf', name: 'كاليفورنيوم'}, {symbol: 'Es', name: 'أينشتاينيوم'},
    {symbol: 'Fm', name: 'فيرميوم'}, {symbol: 'Md', name: 'مندليفيوم'}, {symbol: 'No', name: 'نوبليوم'},
    {symbol: 'Lr', name: 'لورنسيوم'}, {symbol: 'Rf', name: 'رذرفورديوم'}, {symbol: 'Db', name: 'دوبنيوم'},
    {symbol: 'Sg', name: 'سيبورغيوم'}, {symbol: 'Bh', name: 'بوريوم'}, {symbol: 'Hs', name: 'هاسيوم'},
    {symbol: 'Mt', name: 'مايتنريوم'}, {symbol: 'Ds', name: 'دارمشتاتيوم'}, {symbol: 'Rg', name: 'رونتجينيوم'},
    {symbol: 'Cn', name: 'كوبرنيسيوم'}, {symbol: 'Nh', name: 'نيهونيوم'}, {symbol: 'Fl', name: 'فليروفيوم'},
    {symbol: 'Mc', name: 'موسكوفيوم'}, {symbol: 'Lv', name: 'ليفرموريوم'}, {symbol: 'Ts', name: 'تينيسين'},
    {symbol: 'Og', name: 'أوغانيسون'}
];

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x30155A, 10, 50);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xE7E4EB, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x51268F, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x431F79, 1.5, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xE7E4EB, 1, 50);
    pointLight3.position.set(0, 10, 5);
    scene.add(pointLight3);

    createNucleus();
    createParticles();

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    setupDragAndDrop();

    animate();
}

function createNucleus() {
    nucleusGroup = new THREE.Group();
    scene.add(nucleusGroup);
}

function createProtonMesh() {
    const protonGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const protonMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF6B9D,
        emissive: 0xC44569,
        emissiveIntensity: 0.5,
        shininess: 100,
        specular: 0xFF8FB1
    });
    const proton = new THREE.Mesh(protonGeometry, protonMaterial);

    const glowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF6B9D,
        transparent: true,
        opacity: 0.3
    });
    const protonGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    proton.add(protonGlow);
    return proton;
}

function createNeutronMesh() {
    const neutronGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const neutronMaterial = new THREE.MeshPhongMaterial({
        color: 0x4FACFE,
        emissive: 0x00F2FE,
        emissiveIntensity: 0.5,
        shininess: 100,
        specular: 0x7FC8FF
    });
    const neutron = new THREE.Mesh(neutronGeometry, neutronMaterial);

    const glowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4FACFE,
        transparent: true,
        opacity: 0.3
    });
    const neutronGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    neutron.add(neutronGlow);
    return neutron;
}

function calculateNucleusPosition(index, total) {
    const phi = Math.acos(-1 + (2 * index) / (total + 1));
    const theta = Math.sqrt((total + 1) * Math.PI) * phi;
    const radius = 0.8 + Math.sqrt(total) * 0.3;

    return new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
    );
}

function animateParticleToPosition(particle, targetPos, onComplete) {
    const startPos = particle.position.clone();
    const startScale = particle.scale.clone();
    const targetScale = new THREE.Vector3(1, 1, 1);
    let progress = 0;

    const animate = () => {
        progress += 0.05;

        if (progress >= 1) {
            particle.position.copy(targetPos);
            particle.scale.copy(targetScale);
            if (onComplete) onComplete();
            return;
        }

        const eased = 1 - Math.pow(1 - progress, 3);
        particle.position.lerpVectors(startPos, targetPos, eased);
        particle.scale.lerpVectors(startScale, targetScale, eased);

        requestAnimationFrame(animate);
    };

    animate();
}

function reorganizeNucleus() {
    const total = protonMeshes.length + neutronMeshes.length;

    protonMeshes.forEach((proton, i) => {
        const targetPos = calculateNucleusPosition(i, total);
        const startPos = proton.userData.basePosition || proton.position.clone();
        let progress = 0;

        const animate = () => {
            progress += 0.08;
            if (progress >= 1) {
                proton.userData.basePosition = targetPos.clone();
                return;
            }
            const eased = 1 - Math.pow(1 - progress, 2);
            proton.position.lerpVectors(startPos, targetPos, eased);
            requestAnimationFrame(animate);
        };
        animate();
    });

    neutronMeshes.forEach((neutron, i) => {
        const targetPos = calculateNucleusPosition(i + protonMeshes.length, total);
        const startPos = neutron.userData.basePosition || neutron.position.clone();
        let progress = 0;

        const animate = () => {
            progress += 0.08;
            if (progress >= 1) {
                neutron.userData.basePosition = targetPos.clone();
                return;
            }
            const eased = 1 - Math.pow(1 - progress, 2);
            neutron.position.lerpVectors(startPos, targetPos, eased);
            requestAnimationFrame(animate);
        };
        animate();
    });
}

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.particle-drag-item');
    const canvas = renderer.domElement;

    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            const type = item.dataset.type;
            e.dataTransfer.setData('particleType', type);

            const sphere = item.querySelector('.particle-mini-sphere');
            const color = window.getComputedStyle(sphere).background;

            const dragImage = document.createElement('div');
            dragImage.className = 'floating-particle';
            dragImage.style.background = color;
            document.body.appendChild(dragImage);
            e.dataTransfer.setDragImage(dragImage, 20, 20);

            setTimeout(() => dragImage.remove(), 0);
        });
    });

    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();

        const particleType = e.dataTransfer.getData('particleType');
        addParticleToAtom(particleType);
    });
}

function addParticleToAtom(type) {
    atomData[type + 's']++;

    if (type === 'proton') {
        addProtonAnimated();
    } else if (type === 'neutron') {
        addNeutronAnimated();
    } else if (type === 'electron') {
        updateElectronsAnimated();
    }

    updateDisplay();
}

function addProtonAnimated() {
    const proton = createProtonMesh();
    proton.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, 15);
    proton.scale.set(0.1, 0.1, 0.1);

    nucleusGroup.add(proton);
    protonMeshes.push(proton);

    const targetPos = calculateNucleusPosition(protonMeshes.length - 1, protonMeshes.length + neutronMeshes.length);

    animateParticleToPosition(proton, targetPos, () => {
        proton.userData.basePosition = targetPos.clone();
        proton.userData.offset = Math.random() * Math.PI * 2;
        reorganizeNucleus();
    });
}

function addNeutronAnimated() {
    const neutron = createNeutronMesh();
    neutron.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, 15);
    neutron.scale.set(0.1, 0.1, 0.1);

    nucleusGroup.add(neutron);
    neutronMeshes.push(neutron);

    const targetPos = calculateNucleusPosition(neutronMeshes.length - 1 + protonMeshes.length, protonMeshes.length + neutronMeshes.length);

    animateParticleToPosition(neutron, targetPos, () => {
        neutron.userData.basePosition = targetPos.clone();
        neutron.userData.offset = Math.random() * Math.PI * 2;
        reorganizeNucleus();
    });
}

function updateElectronsAnimated() {
    electrons.forEach(e => {
        let opacity = 1;
        const fade = () => {
            opacity -= 0.05;
            if (e.children[0]) e.children[0].material.opacity = Math.max(0, opacity * 0.35);
            if (opacity > 0) {
                requestAnimationFrame(fade);
            } else {
                scene.remove(e);
            }
        };
        fade();
    });

    orbitLines.forEach(o => {
        let opacity = o.material.opacity;
        const targetOpacity = opacity;
        const fade = () => {
            opacity -= targetOpacity * 0.05;
            o.material.opacity = Math.max(0, opacity);
            if (opacity > 0) {
                requestAnimationFrame(fade);
            } else {
                scene.remove(o);
            }
        };
        fade();
    });

    electrons = [];
    orbitLines = [];

    setTimeout(() => {
        const orbitalConfig = [
            {n: 1, orbitals: [{type: 's', count: 2, radius: 3.5}]},
            {n: 2, orbitals: [{type: 's', count: 2, radius: 5.5}, {type: 'p', count: 6, radius: 5.8}]},
            {n: 3, orbitals: [{type: 's', count: 2, radius: 7.5}, {type: 'p', count: 6, radius: 7.8}, {type: 'd', count: 10, radius: 8.2}]},
            {n: 4, orbitals: [{type: 's', count: 2, radius: 9.5}, {type: 'p', count: 6, radius: 9.8}, {type: 'd', count: 10, radius: 10.2}, {type: 'f', count: 14, radius: 10.6}]},
            {n: 5, orbitals: [{type: 's', count: 2, radius: 11.5}, {type: 'p', count: 6, radius: 11.8}, {type: 'd', count: 10, radius: 12.2}]},
            {n: 6, orbitals: [{type: 's', count: 2, radius: 13.5}, {type: 'p', count: 6, radius: 13.8}]},
            {n: 7, orbitals: [{type: 's', count: 2, radius: 15.5}]}
        ];

        let remainingElectrons = atomData.electrons;
        let delay = 0;

        orbitalConfig.forEach(shell => {
            if (remainingElectrons <= 0) return;

            shell.orbitals.forEach(orbital => {
                if (remainingElectrons <= 0) return;

                const electronsInOrbital = Math.min(remainingElectrons, orbital.count);

                setTimeout(() => {
                    createOrbitalPath(orbital.type, orbital.radius, electronsInOrbital, shell.n);
                }, delay);

                delay += 80;
                remainingElectrons -= electronsInOrbital;
            });
        });
    }, 150);
}

function createOrbitalPath(orbitalType, radius, electronCount, shellNumber) {
    const orbitalAngles = getOrbitalAngles(orbitalType);

    orbitalAngles.forEach((angles, orbitIndex) => {
        if (orbitIndex >= electronCount) return;

        const orbitGeometry = new THREE.TorusGeometry(radius, 0.02, 16, 100);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x7D3C98,
            transparent: true,
            opacity: 0
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = angles.x;
        orbit.rotation.y = angles.y;
        orbit.rotation.z = angles.z;
        orbit.scale.set(0.5, 0.5, 0.5);
        scene.add(orbit);
        orbitLines.push(orbit);

        let opacity = 0;
        let scale = 0.5;
        const fadeIn = () => {
            opacity += 0.02;
            scale += (1 - scale) * 0.1;
            orbit.material.opacity = Math.min(0.25, opacity);
            orbit.scale.set(scale, scale, scale);
            if (opacity < 0.25 || scale < 0.99) {
                requestAnimationFrame(fadeIn);
            }
        };
        fadeIn();

        const numElectrons = Math.min(2, electronCount - orbitIndex * 2);
        for (let i = 0; i < numElectrons; i++) {
            setTimeout(() => {
                createElectronAnimated(radius, angles, i * Math.PI, orbitalType, shellNumber);
            }, i * 100);
        }
    });
}

function getOrbitalAngles(orbitalType) {
    switch(orbitalType) {
        case 's':
            return [{x: Math.PI / 2, y: 0, z: 0}];
        case 'p':
            return [
                {x: Math.PI / 2, y: 0, z: 0},
                {x: Math.PI / 2, y: Math.PI / 2, z: 0},
                {x: 0, y: 0, z: 0}
            ];
        case 'd':
            return [
                {x: Math.PI / 2, y: 0, z: 0},
                {x: Math.PI / 2, y: Math.PI / 4, z: 0},
                {x: Math.PI / 2, y: Math.PI / 2, z: 0},
                {x: Math.PI / 2, y: 3 * Math.PI / 4, z: 0},
                {x: Math.PI / 4, y: 0, z: Math.PI / 4}
            ];
        case 'f':
            return [
                {x: Math.PI / 2, y: 0, z: 0},
                {x: Math.PI / 2, y: Math.PI / 3, z: 0},
                {x: Math.PI / 2, y: 2 * Math.PI / 3, z: 0},
                {x: Math.PI / 2, y: Math.PI, z: 0},
                {x: Math.PI / 3, y: 0, z: Math.PI / 6},
                {x: Math.PI / 3, y: Math.PI / 2, z: Math.PI / 6},
                {x: Math.PI / 6, y: Math.PI / 4, z: Math.PI / 3}
            ];
        default:
            return [{x: Math.PI / 2, y: 0, z: 0}];
    }
}

function createElectronAnimated(radius, angles, startAngle, orbitalType, shellNumber) {
    const electron = createElectron(radius, angles, startAngle, orbitalType, shellNumber);
    electron.position.set(0, 0, 0);
    electron.scale.set(0, 0, 0);

    let progress = 0;
    const animate = () => {
        progress += 0.05;
        if (progress >= 1) {
            electron.scale.set(1, 1, 1);
            return;
        }
        const eased = 1 - Math.pow(1 - progress, 2);
        electron.scale.set(eased, eased, eased);
        requestAnimationFrame(animate);
    };
    animate();
}

function createElectron(radius, angles, startAngle, orbitalType, shellNumber) {
    const electronGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const electronMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFA751,
        emissive: 0xFF8C42,
        emissiveIntensity: 0.7,
        shininess: 100,
        specular: 0xFFD700
    });
    const electron = new THREE.Mesh(electronGeometry, electronMaterial);

    const glowGeometry = new THREE.SphereGeometry(0.45, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFE259,
        transparent: true,
        opacity: 0.35
    });
    const electronGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    electron.add(electronGlow);

    electron.userData = {
        radius: radius,
        angle: startAngle,
        speed: (0.2 - shellNumber * 0.015) * (orbitalType === 'p' ? 1.2 : 1),
        rotationX: angles.x,
        rotationY: angles.y,
        rotationZ: angles.z,
        orbitalType: orbitalType
    };

    scene.add(electron);
    electrons.push(electron);
    return electron;
}

function getElectronShells(electronCount) {
    const shells = [];
    const shellCapacity = [2, 8, 18, 32, 32, 18, 8];
    let remaining = electronCount;

    for (let i = 0; i < shellCapacity.length && remaining > 0; i++) {
        const electronsInShell = Math.min(remaining, shellCapacity[i]);
        shells.push(electronsInShell);
        remaining -= electronsInShell;
    }

    return shells;
}

function updateDisplay() {
    document.getElementById('protonCount').textContent = atomData.protons;
    document.getElementById('neutronCount').textContent = atomData.neutrons;
    document.getElementById('electronCount').textContent = atomData.electrons;

    document.getElementById('protonDisplay').textContent = atomData.protons;
    document.getElementById('neutronDisplay').textContent = atomData.neutrons;
    document.getElementById('electronDisplay').textContent = atomData.electrons;

    if (atomData.protons > 0) {
        const element = elements[atomData.protons - 1] || {symbol: 'X', name: 'عنصر غير معروف'};
        document.getElementById('elementSymbol').textContent = element.symbol;
        document.getElementById('elementName').textContent = element.name;
    } else {
        document.getElementById('elementSymbol').textContent = '?';
        document.getElementById('elementName').textContent = 'ابدأ البناء';
    }
}

function resetAtom() {
    atomData = {
        protons: 0,
        neutrons: 0,
        electrons: 0
    };

    protonMeshes.forEach(p => nucleusGroup.remove(p));
    protonMeshes = [];

    neutronMeshes.forEach(n => nucleusGroup.remove(n));
    neutronMeshes = [];

    electrons.forEach(e => scene.remove(e));
    electrons = [];

    orbitLines.forEach(o => scene.remove(o));
    orbitLines = [];

    updateDisplay();
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x51268F,
        transparent: true,
        opacity: 0.4
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
}

function animate() {
    requestAnimationFrame(animate);

    if (nucleusGroup && isRotating) {
        nucleusGroup.rotation.y += 0.003;
        nucleusGroup.rotation.x += 0.001;
    }

    const time = Date.now() * 0.001;
    protonMeshes.forEach((proton) => {
        if (proton.userData.basePosition) {
            const wobble = Math.sin(time + proton.userData.offset) * 0.05;
            proton.position.x = proton.userData.basePosition.x + wobble;
            proton.position.y = proton.userData.basePosition.y + Math.cos(time + proton.userData.offset) * 0.05;
        }
    });

    neutronMeshes.forEach((neutron) => {
        if (neutron.userData.basePosition) {
            const wobble = Math.sin(time + neutron.userData.offset) * 0.05;
            neutron.position.x = neutron.userData.basePosition.x + wobble;
            neutron.position.y = neutron.userData.basePosition.y + Math.cos(time + neutron.userData.offset) * 0.05;
        }
    });

    electrons.forEach((electron) => {
        electron.userData.angle += electron.userData.speed * 0.01;

        const angle = electron.userData.angle;
        let x = Math.cos(angle) * electron.userData.radius;
        let y = Math.sin(angle) * electron.userData.radius;
        let z = 0;

        const cosX = Math.cos(electron.userData.rotationX);
        const sinX = Math.sin(electron.userData.rotationX);
        const cosY = Math.cos(electron.userData.rotationY);
        const sinY = Math.sin(electron.userData.rotationY);

        let tempY = y * cosX - z * sinX;
        let tempZ = y * sinX + z * cosX;
        y = tempY;
        z = tempZ;

        let tempX = x * cosY + z * sinY;
        tempZ = -x * sinY + z * cosY;
        x = tempX;
        z = tempZ;

        electron.position.set(x, y, z);
        electron.rotation.y += 0.05;
    });

    camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
