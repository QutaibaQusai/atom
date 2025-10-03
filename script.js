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

function addProton() {
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

    positionNucleusParticle(proton, protonMeshes.length + neutronMeshes.length);
    nucleusGroup.add(proton);
    protonMeshes.push(proton);
}

function addNeutron() {
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

    positionNucleusParticle(neutron, protonMeshes.length + neutronMeshes.length);
    nucleusGroup.add(neutron);
    neutronMeshes.push(neutron);
}

function positionNucleusParticle(particle, index) {
    const phi = Math.acos(-1 + (2 * index) / (protonMeshes.length + neutronMeshes.length + 1));
    const theta = Math.sqrt((protonMeshes.length + neutronMeshes.length + 1) * Math.PI) * phi;

    const radius = 0.8 + Math.sqrt(protonMeshes.length + neutronMeshes.length) * 0.3;

    particle.position.x = radius * Math.cos(theta) * Math.sin(phi);
    particle.position.y = radius * Math.sin(theta) * Math.sin(phi);
    particle.position.z = radius * Math.cos(phi);

    particle.userData.basePosition = particle.position.clone();
    particle.userData.offset = Math.random() * Math.PI * 2;
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
        addProton();
    } else if (type === 'neutron') {
        addNeutron();
    } else if (type === 'electron') {
        updateElectrons();
    }

    updateDisplay();
}

function updateElectrons() {
    electrons.forEach(e => scene.remove(e));
    electrons = [];

    orbitLines.forEach(o => scene.remove(o));
    orbitLines = [];

    const shells = getElectronShells(atomData.electrons);
    let baseRadius = 3.5;

    shells.forEach((shellElectrons, shellIndex) => {
        const radius = baseRadius + (shellIndex * 2.8);
        const orbitAngle = (shellIndex * 50) % 180;

        const orbitGeometry = new THREE.TorusGeometry(radius, 0.03, 16, 100);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x7D3C98,
            transparent: true,
            opacity: 0.4
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        orbit.rotation.y = (orbitAngle * Math.PI) / 180;
        scene.add(orbit);
        orbitLines.push(orbit);

        for (let i = 0; i < shellElectrons; i++) {
            const electronGeometry = new THREE.SphereGeometry(0.35, 32, 32);
            const electronMaterial = new THREE.MeshPhongMaterial({
                color: 0xFFA751,
                emissive: 0xFF8C42,
                emissiveIntensity: 0.7,
                shininess: 100,
                specular: 0xFFD700
            });
            const electron = new THREE.Mesh(electronGeometry, electronMaterial);

            const glowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0xFFE259,
                transparent: true,
                opacity: 0.4
            });
            const electronGlow = new THREE.Mesh(glowGeometry, glowMaterial);
            electron.add(electronGlow);

            const angle = (i / shellElectrons) * Math.PI * 2;
            electron.userData = {
                radius: radius,
                angle: angle,
                speed: 0.15 + shellIndex * 0.08,
                orbitAngle: (orbitAngle * Math.PI) / 180
            };

            scene.add(electron);
            electrons.push(electron);
        }
    });
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
    protonMeshes.forEach((proton, index) => {
        const wobble = Math.sin(time + proton.userData.offset) * 0.05;
        proton.position.x = proton.userData.basePosition.x + wobble;
        proton.position.y = proton.userData.basePosition.y + Math.cos(time + proton.userData.offset) * 0.05;
    });

    neutronMeshes.forEach((neutron, index) => {
        const wobble = Math.sin(time + neutron.userData.offset) * 0.05;
        neutron.position.x = neutron.userData.basePosition.x + wobble;
        neutron.position.y = neutron.userData.basePosition.y + Math.cos(time + neutron.userData.offset) * 0.05;
    });

    electrons.forEach((electron) => {
        electron.userData.angle += electron.userData.speed * 0.01;

        const x = Math.cos(electron.userData.angle) * electron.userData.radius;
        const z = Math.sin(electron.userData.angle) * electron.userData.radius;

        const cosOrbit = Math.cos(electron.userData.orbitAngle);
        const sinOrbit = Math.sin(electron.userData.orbitAngle);

        electron.position.x = x * cosOrbit;
        electron.position.y = x * sinOrbit;
        electron.position.z = z;
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
