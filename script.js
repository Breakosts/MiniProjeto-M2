let pacientes = [];

// Função para pegar os elementos e salvar no array.
function getElements() {
    let name = document.querySelector('#name').value;
    let idade = document.querySelector('#idade').value;
    let genero = document.querySelector('select[name=gender]').value;
    let data = document.querySelector('#data').value;

     if (!name || !idade || !genero || !data) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return; 
    }

    let dataFormatada = new Date(data).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' });

    let paciente = {
        nome: name,
        idade: idade,
        genero: genero,
        data: dataFormatada,
    }
    pacientes.push(paciente);
    renderElements();
}

window.addEventListener('load', renderElements);

// Função para renderizar os elementos na tela
function renderElements() {
    let aside = document.querySelector('aside');
    aside.innerHTML = '';

    if (pacientes.length > 0) {
        aside.style.backgroundColor = '#75fca9';  
        aside.style.borderColor = '#000000';
        aside.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    } else {
        aside.style.backgroundColor = 'transparent';  
        aside.style.borderColor = 'transparent';
        aside.style.boxShadow = 'none';
    }

    // Itera sobre o array de pacientes
    pacientes.forEach((paciente, index) => {
        let pacientesLista = document.createElement("ul");

        let pacienteListaName = document.createElement("li");
        pacienteListaName.textContent = `Nome: ${paciente.nome}`;

        let pacienteListaIdade = document.createElement("li");
        pacienteListaIdade.textContent = `Idade: ${paciente.idade}`;

        let pacienteListaGenero = document.createElement("li");
        pacienteListaGenero.textContent = `Gênero: ${paciente.genero}`;

        let pacienteListaData = document.createElement("li");
        pacienteListaData.textContent = `Data da consulta: ${paciente.data}`;

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('buttonsList');
        deleteButton.textContent = 'Deletar';

        let updateButton = document.createElement('button');
        updateButton.classList.add('buttonsList');
        updateButton.textContent = 'Atualizar';

        pacientesLista.append(
            pacienteListaName, 
            pacienteListaIdade, 
            pacienteListaGenero, 
            pacienteListaData, 
            deleteButton, 
            updateButton
        );

        aside.appendChild(pacientesLista);

        // Deletar paciente
        deleteButton.addEventListener('click', () => {
            pacientes.splice(index, 1);
            renderElements();
            alert(`Paciente ${paciente.nome} deletado!`);
        });

        // Atualizar paciente
        updateButton.addEventListener('click', () => {
            // Preenche os campos do formulário com os dados do paciente a ser atualizado
            document.querySelector('#name').value = paciente.nome;
            document.querySelector('#idade').value = paciente.idade;
            document.querySelector('select[name=gender]').value = paciente.genero;
            document.querySelector('#data').value = paciente.data;

            // Armazena o índice do paciente a ser atualizado
            document.querySelector('#salvarButton').setAttribute('data-index', index);

            // Exibe o botão "Salvar"
            document.querySelector('#salvarButton').style.display = 'inline-block';
        });
    });
}

// Função para atualizar o paciente no array
function updatePatient() {
    let name = document.querySelector('#name').value;
    let idade = document.querySelector('#idade').value;
    let genero = document.querySelector('select[name=gender]').value;
    let data = document.querySelector('#data').value;

    let index = document.querySelector('#salvarButton').getAttribute('data-index'); // Pega o índice do paciente

    // Atualizando os dados do paciente no array
    pacientes[index] = {
        nome: name,
        idade: idade,
        genero: genero,
        data: data,
    };

    // Re-renderiza a lista com os dados atualizados
    renderElements();

    // Esconde o botão "Salvar"
    document.querySelector('#salvarButton').style.display = 'none';

    // Limpa os campos do formulário
    clearForm();
}

// Função para limpar os campos do formulário
function clearForm() {
    document.querySelector('#name').value = '';
    document.querySelector('#idade').value = '';
    document.querySelector('select[name=gender]').value = '';
    document.querySelector('#data').value = '';
}
