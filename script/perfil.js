document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioDados'));

  const fotoPerfilHeader = document.querySelector('#profile-container img');
  const modal = document.getElementById('modalPerfil');

  fotoPerfilHeader.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.toggle('d-none');
  });

  document.addEventListener('click', (event) => {
    const isClickInsideModal = modal.contains(event.target);
    const isClickOnProfileImg = fotoPerfilHeader.contains(event.target);

    if (!isClickInsideModal && !isClickOnProfileImg && !modal.classList.contains('d-none')) {
      modal.classList.add('d-none');
    }
  });

 
  document.getElementById('linkAlterarEmail').addEventListener('click', (e) => {
    e.preventDefault();
    fecharMiniOverlay();
    mostrarOverlayEmail();
  });

  document.getElementById('linkAlterarSenha').addEventListener('click', (e) => {
    e.preventDefault();
    fecharMiniOverlay();
    mostrarOverlaySenha();
  });

  document.getElementById('btnSair').addEventListener('click', (e) => {
    e.preventDefault();
    const confirmar = confirm('Tem certeza que quer sair da conta?');
    if (confirmar) {
      localStorage.removeItem('usuarioDados');
      alert('Logout realizado! Redirecionando...');
      window.location.href = 'index.html';
    }
  });
});

function fecharMiniOverlay() {
  const modal = document.getElementById('modalPerfil');
  if (modal) modal.classList.add('d-none');
}

function mostrarOverlayEmail() {
  const overlay = document.createElement('div');
  overlay.id = 'overlay-email-senha';
  overlay.innerHTML = `
    <div class="overlay-box">
      <button class="close-btn" onclick="fecharOverlay()">&times;</button>
      <h2>Alterar E-mail</h2>
      <input type="email" id="novoEmail" placeholder="Novo e-mail" />
      <input type="email" id="confirmarEmail" placeholder="Confirmar novo e-mail" />
      <button class="btn" onclick="confirmarAlteracaoEmail()">Confirmar novo e-mail</button>
      <button class="btn btn-cancel" onclick="fecharOverlay()">Cancelar</button>
    </div>
  `;
  document.body.appendChild(overlay);


  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fecharOverlay();
  });
}

function mostrarOverlaySenha() {
  const overlay = document.createElement('div');
  overlay.id = 'overlay-email-senha';
  overlay.innerHTML = `
    <div class="overlay-box">
      <button class="close-btn" onclick="fecharOverlay()">&times;</button>
      <h2>Alterar Senha</h2>
      <input type="password" id="novaSenha" placeholder="Nova senha" />
      <input type="password" id="confirmarSenha" placeholder="Confirmar nova senha" />
      <button class="btn" onclick="confirmarAlteracaoSenha()">Confirmar nova senha</button>
      <button class="btn btn-cancel" onclick="fecharOverlay()">Cancelar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fecharOverlay();
  });
}

function fecharOverlay() {
  const overlay = document.getElementById('overlay-email-senha');
  if (overlay) overlay.remove();
}

function confirmarAlteracaoEmail() {
  const novoEmail = document.getElementById('novoEmail').value.trim();
  const confirmarEmail = document.getElementById('confirmarEmail').value.trim();

  if (!novoEmail || !novoEmail.includes('@')) {
    alert('Digite um e-mail válido.');
    return;
  }

  if (novoEmail !== confirmarEmail) {
    alert('Os e-mails não coincidem.');
    return;
  }

  const usuario = JSON.parse(localStorage.getItem('usuarioDados'));
  usuario.email = novoEmail;
  localStorage.setItem('usuarioDados', JSON.stringify(usuario));

  alert('E-mail atualizado com sucesso. Verifique seu novo endereço.');
  fecharOverlay();
}
 
function confirmarAlteracaoSenha() {
  const novaSenha = document.getElementById('novaSenha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (novaSenha.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  if (novaSenha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  alert('Senha alterada com sucesso! Verifique seu e-mail para confirmação.');
  fecharOverlay();
}

document.addEventListener('DOMContentLoaded', () => {
  const btnEditarPerfil = document.getElementById('btn-editar-perfil');
  const modalEditar = document.getElementById('modal-editar-perfil');
  const btnCancelar = document.getElementById('cancelarEdicaoPerfil');
  const btnSalvar = document.getElementById('salvarEdicaoPerfil');

  btnEditarPerfil.addEventListener('click', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioDados')) || {};
    document.getElementById('editNome').value = usuario.nome || '';
    document.getElementById('editNascimento').value = usuario.nascimento || '';
    document.getElementById('editModalidade').value = usuario.modalidade || '';
    document.getElementById('editBio').value = usuario.bio || '';
    modalEditar.classList.remove('d-none');
  });

  btnCancelar.addEventListener('click', () => {
    modalEditar.classList.add('d-none');
  });

  btnSalvar.addEventListener('click', () => {
    const nome = document.getElementById('editNome').value.trim();
    const nascimento = document.getElementById('editNascimento').value;
    const modalidade = document.getElementById('editModalidade').value.trim();
    const bio = document.getElementById('editBio').value.trim();

    if (!nome || !nascimento || !modalidade) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuarioDados')) || {};
    usuario.nome = nome;
    usuario.nascimento = nascimento;
    usuario.modalidade = modalidade;
    usuario.bio = bio;

    localStorage.setItem('usuarioDados', JSON.stringify(usuario));

    document.getElementById('nomeCompleto').textContent = nome;
    document.getElementById('nascimento').textContent = nascimento;
    document.getElementById('modalidade').textContent = modalidade;
    document.getElementById('bio').textContent = bio;

    alert('Perfil atualizado com sucesso!');
    modalEditar.classList.add('d-none');
  });
});

btnEditarPerfil.addEventListener('click', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioDados')) || {};

  document.getElementById('editNome').value = usuario.nome || '';
  document.getElementById('editNascimento').value = usuario.nascimento || '';
  document.getElementById('editModalidade').value = usuario.modalidade || '';
  document.getElementById('editTipoConta').value = usuario.tipoConta || '';
  document.getElementById('editBio').value = usuario.bio || '';

  modalEditar.classList.remove('d-none');
});

btnSalvar.addEventListener('click', () => {
  const nome = document.getElementById('editNome').value.trim();
  const nascimento = document.getElementById('editNascimento').value;
  const modalidade = document.getElementById('editModalidade').value;
  const tipoConta = document.getElementById('editTipoConta').value;
  const bio = document.getElementById('editBio').value.trim();

  if (!nome || !nascimento || !modalidade || !tipoConta) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const idade = calcularIdade(nascimento);

  const usuario = JSON.parse(localStorage.getItem('usuarioDados')) || {};
  usuario.nome = nome;
  usuario.nascimento = nascimento;
  usuario.modalidade = modalidade;
  usuario.tipoConta = tipoConta;
  usuario.bio = bio;
  usuario.idade = idade;

  localStorage.setItem('usuarioDados', JSON.stringify(usuario));

  document.getElementById('nomeCompleto').textContent = nome;
  document.getElementById('nascimento').textContent = nascimento;
  document.getElementById('modalidade').textContent = modalidade;
  document.getElementById('tipoConta').textContent = tipoConta;
  document.getElementById('bio').textContent = bio;
  document.getElementById('idade').textContent = idade;

  alert('Perfil atualizado com sucesso!');
  modalEditar.classList.add('d-none');
});
