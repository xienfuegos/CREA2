import { 
  PenTool, 
  Video, 
  FileText
} from 'lucide-react';
import { AcademicEvent, ResourceCategory, Tutorial } from './types';

export const academicEvents2025: AcademicEvent[] = [
    { title: 'Inicio del Primer Cuatrimestre', start: new Date('2025-04-07T03:00:00Z'), end: new Date('2025-07-19T03:00:00Z'), type: 'cuatrimestre' },
    { title: 'Inscripción a Cursadas (1er Cuat.)', start: new Date('2025-03-24T03:00:00Z'), end: new Date('2025-04-04T03:00:00Z'), type: 'inscripcion' },
    { title: 'Finales - Turno Febrero/Marzo', start: new Date('2025-02-17T03:00:00Z'), end: new Date('2025-03-21T03:00:00Z'), type: 'examen' },
    { title: 'Finales - Turno Julio/Agosto', start: new Date('2025-07-28T03:00:00Z'), end: new Date('2025-08-22T03:00:00Z'), type: 'examen' },
    { title: 'Inicio del Segundo Cuatrimestre', start: new Date('2025-08-25T03:00:00Z'), end: new Date('2025-12-06T03:00:00Z'), type: 'cuatrimestre' },
    { title: 'Evaluaciones Parciales (1er Cuat.)', start: new Date('2025-05-19T03:00:00Z'), end: new Date('2025-06-07T03:00:00Z'), type: 'evaluacion' },
    { title: 'Evaluaciones Parciales (2do Cuat.)', start: new Date('2025-10-13T03:00:00Z'), end: new Date('2025-11-01T03:00:00Z'), type: 'evaluacion' },
];

export const RECURSOS_DATA: { docente: ResourceCategory[] } = {
    docente: [
        {
            category: 'Creación de Contenido',
            icon: PenTool,
            tools: [
                { name: 'Canva', desc: 'Diseño gráfico para no diseñadores. Crea presentaciones, infografías y más.' },
                { name: 'Genially', desc: 'Crea contenidos interactivos y animados de forma sencilla.' },
                { name: 'H5P', desc: 'Crea, comparte y reutiliza contenido interactivo en tu navegador.' },
            ]
        },
        {
            category: 'Video y Animación',
            icon: Video,
            tools: [
                { name: 'Loom', desc: 'Graba tu pantalla y cámara para crear videotutoriales rápidos.' },
                { name: 'Powtoon', desc: 'Crea videos animados y presentaciones atractivas.' },
                { name: 'Screencast-O-Matic', desc: 'Grabador de pantalla y editor de video fácil de usar.' },
            ]
        },
        {
            category: 'Evaluación y Feedback',
            icon: FileText,
            tools: [
                { name: 'Kahoot!', desc: 'Crea juegos de preguntas y encuestas para dinamizar tus clases.' },
                { name: 'Mentimeter', desc: 'Presentaciones interactivas con nubes de palabras, encuestas y Q&A.' },
                { name: 'Socrative', desc: 'Evalúa el conocimiento de los estudiantes con actividades en tiempo real.' },
            ]
        },
    ]
};

export const TUTORIALES_DATA: { docente: Tutorial[] } = {
    docente: [
        {
            type: 'interactive',
            title: 'Actualizar tu foto de perfil',
            desc: 'Aprende a cambiar tu imagen de perfil en la plataforma con este tutorial interactivo.',
            steps: [
                { ui: 'main_page', state: { userMenuOpen: false }, hotspot: { top: '18px', right: '20px', width: '150px', height: '40px' }, text: 'Primero, haz clic en el menú de usuario para desplegar las opciones.' },
                { ui: 'main_page', state: { userMenuOpen: true }, hotspot: { top: '65px', right: '10px', width: '180px', height: '40px' }, text: 'Luego, selecciona la opción "Perfil" para ir a tu página de perfil.' },
                { ui: 'profile_page', state: {}, hotspot: { top: '155px', left: '45px', width: '250px', height: '40px' }, text: 'Ahora, haz clic en "Editar perfil" para acceder a la pantalla de edición.' },
                { ui: 'edit_profile_page', state: { showFilePicker: false }, hotspot: { top: '250px', left: '40px', width: '90%', height: '100px' }, text: 'Haz clic en el área de "Imagen nueva" para abrir el selector de archivos.' },
                { ui: 'edit_profile_page', state: { showFilePicker: true }, hotspot: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '70%' }, text: 'En el selector, sube tu nueva foto y finaliza el proceso.' },
            ]
        },
        {
            type: 'standard',
            title: 'Añadir un recurso a tu curso',
            desc: 'Guía paso a paso para agregar archivos, enlaces y otros recursos para tus estudiantes.',
            content: [
                { type: 'h3', text: 'Activando el modo de edición' },
                { type: 'p', text: 'Para comenzar a añadir o modificar contenido en tu curso, lo primero que debes hacer es activar el "Modo de edición". Encontrarás el interruptor en la esquina superior derecha de la página de tu curso.' },
                { type: 'h3', text: 'Añadir una actividad o un recurso' },
                { type: 'p', text: 'Una vez activado el modo de edición, verás que aparecen nuevas opciones en cada sección de tu curso. Busca y haz clic en el enlace "+ Añadir una actividad o un recurso".' },
                { type: 'h4', text: 'Tipos de recursos comunes:' },
                { type: 'ul', items: ['Archivo: Para subir un documento PDF, Word, etc.', 'URL: Para enlazar a una página web externa.', 'Carpeta: Para organizar varios archivos en un solo lugar.'] },
                { type: 'p', text: 'Selecciona el tipo de recurso que deseas añadir y sigue las instrucciones para configurarlo. ¡No olvides guardar los cambios!' },
            ]
        }
    ]
};