// Demo-only local storage version
function load(key){return JSON.parse(localStorage.getItem(key)||'[]');}
function save(key,data){localStorage.setItem(key,JSON.stringify(data));}

// Dashboard
if(document.getElementById('stats')){
  const clients = load('clients');
  const firms = load('firms');
  document.getElementById('stats').innerHTML =
    `<p>Klienti: ${clients.length}</p><p>Firmy: ${firms.length}</p>`;
  document.getElementById('updates').innerHTML = firms.map(f => `<div>${f.name} – ${f.note||'bez poznámky'}</div>`).join('');
}

// Klienti
if(document.getElementById('clientsTable')){
  const table = document.querySelector('#clientsTable tbody');
  const btn = document.getElementById('addClient');
  function render(){
    const data = load('clients');
    table.innerHTML = data.map(c=>`<tr><td>${c.name}</td><td>${c.email}</td><td>${c.phone}</td><td>${c.inv}</td><td>${c.note}</td></tr>`).join('');
  }
  btn.onclick = ()=>{
    const name = prompt('Jméno');
    const email = prompt('E-mail');
    const phone = prompt('Telefon');
    const inv = prompt('Investice');
    const note = prompt('Poznámka');
    const d = load('clients'); d.push({name,email,phone,inv,note}); save('clients',d); render();
  }
  render();
}

// Firmy
if(document.getElementById('firmsTable')){
  const table = document.querySelector('#firmsTable tbody');
  const btn = document.getElementById('addFirm');
  function render(){
    const data = load('firms');
    table.innerHTML = data.map(f=>`<tr><td>${f.name}</td><td>${f.web}</td><td>${f.linkedin}</td><td>${f.note}</td></tr>`).join('');
  }
  btn.onclick = ()=>{
    const name = prompt('Název firmy');
    const web = prompt('Web');
    const linkedin = prompt('LinkedIn');
    const note = prompt('Poznámka');
    const d = load('firms'); d.push({name,web,linkedin,note}); save('firms',d); render();
  }
  render();
}

// E-maily
if(document.getElementById('mailForm')){
  const f = document.getElementById('mailForm');
  const hist = document.getElementById('history');
  f.onsubmit = e=>{
    e.preventDefault();
    const h = load('mails');
    h.push({subject: f.subject.value, body: f.body.value, date: new Date().toLocaleString()});
    save('mails',h);
    alert('E-mail uložen (demo)');
    render();
  }
  function render(){
    const h = load('mails');
    hist.innerHTML = h.map(m=>`<div><b>${m.subject}</b> – ${m.date}</div>`).join('');
  }
  render();
}
