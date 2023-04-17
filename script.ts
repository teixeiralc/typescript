// 1 - Crie uma interface UserData para o formulário abaixo
// 2 - Crie uma variável global UserData no window, ela será um objeto qualquer
// 3 - Adicione um evento de keyup ao formulário
// 4 - Quando o evento ocorrer adicione a {[id]: value} ao UserData
// 5 - Salve UserData no localStorage
// 6 - Crie uma User Type Guard, para verificar se o valor de localStorage é compatível com UserData
// 7 - Ao refresh da página, preencha os valores de localStorage (caso seja UserData) no formulário e em window.UserData

interface Window {
  UserData: any;
}

window.UserData = {};

interface IUserData {
  name?: string;
  email?: string;
  cpf?: string;
}

const form = document.getElementById('form');

function isValidJson(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

function isUserData(data: unknown): data is IUserData {
  if (data && typeof data === 'object' && ('name' in data || 'email' in data || 'cpf' in data)) return true;
  return false;
}

function handleKeyUp({ target }: KeyboardEvent) {
  if (target instanceof HTMLInputElement) {
    window.UserData[target.id] = target.value;
    localStorage.setItem('UserData', JSON.stringify(window.UserData));
  }
}

function getLocalStorage() {
  const data = localStorage.getItem('UserData');
  if (data && isValidJson(data)) {
    const userData = JSON.parse(data);
    if (isUserData(userData)) {
      window.UserData = userData;
      Object.entries(userData).forEach(([key, value]) => {
        const input = document.getElementById(key);
        if (input instanceof HTMLInputElement) {
          input.value = value;
        }
      });
    }
  }
}
getLocalStorage();

form?.addEventListener('keyup', handleKeyUp);
