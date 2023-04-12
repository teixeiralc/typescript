// 1 - Faça um fetch da API: https://api.origamid.dev/json/cursos.json
// 2 - Defina a interface da API
// 3 - Crie um Type Guard, que garanta que a API possui nome, horas e tags
// 4 - Use Type Guards para garantir a Type Safety do código
// 5 - Preencha os dados da API na tela.

async function fetchData() {
  const res = await fetch('https://api.origamid.dev/json/cursos.json');
  const json = await res.json();
  handleData(json);
}
fetchData();

interface ICourse {
  nome: string;
  horas: number;
  tags: string[];
}

function isCourse(value: unknown): value is ICourse {
  if (value && typeof value === 'object' && 'nome' in value && 'horas' in value && 'tags' in value) {
    return true;
  }
  return false;
}

function handleData(data: unknown) {
  if (Array.isArray(data)) {
    data.filter(isCourse).forEach((course) => {
      document.body.innerHTML += `
      <div>
        <h1>${course.nome}</h1>
        <p>${course.horas}</p>
        <p>${course.tags}</p>
      </div>
      `;
    });
  }
}
