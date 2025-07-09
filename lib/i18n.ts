export const translations = {
  en: {
    // Common
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    login: "Login",
    register: "Register",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    search: "Search",
    loading: "Loading...",

    // Navigation
    home: "Home",
    schedule: "Schedule",
    subjects: "Subjects",
    grades: "Grades",
    payments: "Payments",
    students: "Students",
    notifications: "Notifications",
    announcements: "Announcements",

    // Roles
    student: "Student",
    lecturer: "Lecturer",
    coordinator: "Coordinator",

    // Faculties
    computer_science: "Computer Science",
    accounting: "Accounting",
    business_management: "Business Management",

    // Academic Years
    year_1: "Year 1",
    year_2: "Year 2",
    year_3: "Year 3",
    year_4: "Year 4",

    // Profile
    username: "Username",
    full_name: "Full Name",
    email: "Email",
    bio: "Bio",
    age: "Age",
    faculty: "Faculty",
    academic_year: "Academic Year",
    course: "Course",
    role: "Role",

    // Grades
    assignment_1: "Assignment 1",
    assignment_2: "Assignment 2",
    test_1: "Test 1",
    test_2: "Test 2",
    exam: "Exam",
    final_average: "Final Average",

    // Payments
    amount: "Amount",
    month: "Month",
    year: "Year",
    status: "Status",
    paid: "Paid",
    pending: "Pending",
    overdue: "Overdue",
    payment_history: "Payment History",

    // Schedule
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",

    // Messages
    welcome_back: "Welcome back",
    no_data: "No data available",
    success: "Success",
    error: "Error",

    // Semesters
    first_semester: "First Semester (Feb - Jul)",
    second_semester: "Second Semester (Aug - Dec)",

    // Landing Page
    hero_title: "University Management Made Simple",
    hero_subtitle:
      "Connect students, lecturers, and coordinators in one unified platform. Manage grades, payments, schedules, and collaboration effortlessly.",
    get_started: "Get Started",
    sign_in: "Sign In",
    features_title: "Everything You Need in One Place",
    features_subtitle:
      "Streamline your university operations with our comprehensive set of tools designed for the Mozambican education system.",
  },
  pt: {
    // Common
    dashboard: "Painel",
    profile: "Perfil",
    settings: "Configurações",
    logout: "Sair",
    login: "Entrar",
    register: "Registrar",
    save: "Salvar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Excluir",
    add: "Adicionar",
    search: "Pesquisar",
    loading: "Carregando...",

    // Navigation
    home: "Início",
    schedule: "Horário",
    subjects: "Disciplinas",
    grades: "Notas",
    payments: "Pagamentos",
    students: "Estudantes",
    notifications: "Notificações",
    announcements: "Anúncios",

    // Roles
    student: "Estudante",
    lecturer: "Professor",
    coordinator: "Coordenador",

    // Faculties
    computer_science: "Ciência da Computação",
    accounting: "Contabilidade",
    business_management: "Gestão de Negócios",

    // Academic Years
    year_1: "Ano 1",
    year_2: "Ano 2",
    year_3: "Ano 3",
    year_4: "Ano 4",

    // Profile
    username: "Nome de usuário",
    full_name: "Nome completo",
    email: "Email",
    bio: "Biografia",
    age: "Idade",
    faculty: "Faculdade",
    academic_year: "Ano acadêmico",
    course: "Curso",
    role: "Função",

    // Grades
    assignment_1: "Trabalho 1",
    assignment_2: "Trabalho 2",
    test_1: "Teste 1",
    test_2: "Teste 2",
    exam: "Exame",
    final_average: "Média Final",

    // Payments
    amount: "Valor",
    month: "Mês",
    year: "Ano",
    status: "Estado",
    paid: "Pago",
    pending: "Pendente",
    overdue: "Em atraso",
    payment_history: "Histórico de Pagamentos",

    // Schedule
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",

    // Messages
    welcome_back: "Bem-vindo de volta",
    no_data: "Nenhum dado disponível",
    success: "Sucesso",
    error: "Erro",

    // Semesters
    first_semester: "Primeiro Semestre (Fev - Jul)",
    second_semester: "Segundo Semestre (Ago - Dez)",

    // Landing Page
    hero_title: "Gestão Universitária Simplificada",
    hero_subtitle:
      "Conecte estudantes, professores e coordenadores numa plataforma unificada. Gerencie notas, pagamentos, horários e colaboração sem esforço.",
    get_started: "Começar",
    sign_in: "Entrar",
    features_title: "Tudo o Que Precisa Num Só Lugar",
    features_subtitle:
      "Simplifique as operações da sua universidade com o nosso conjunto abrangente de ferramentas desenhadas para o sistema educativo moçambicano.",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

export function useTranslation(language: Language = "en") {
  return {
    t: (key: TranslationKey): string => {
      const translation = translations[language]?.[key] || translations.en[key] || key
      return translation
    },
    language,
  }
}
