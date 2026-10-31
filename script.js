document.addEventListener('DOMContentLoaded',()=>{
  if(location.pathname.endsWith('index.html')||location.pathname.endsWith('/')){
    const main=document.querySelector('main');
    const section=document.createElement('section');
    section.className='section multimedia-section';
    section.innerHTML='<div class="container"><div class="content-grid"><article class="card"><div class="eyebrow">Multimedia journal</div><h2>A small study break</h2><p>Good software work needs focus and balance. This local audio element demonstrates the multimedia requirement for my COS 106 portfolio.</p><audio controls preload="metadata" style="width:100%;display:block" aria-label="Short study break audio"><source src="media/study-tone.wav" type="audio/wav">Your browser does not support HTML audio.</audio></article><aside class="notice"><strong>My personal motto:</strong> Quality is not an accident. It comes from curiosity, careful testing, learning from mistakes and improving every day.</aside></div></div>';
    main.append(section);
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const taskForm=document.getElementById('task-form');
  if(taskForm){
    const input=document.getElementById('task-input'),list=document.getElementById('task-list'),status=document.getElementById('task-status');
    let tasks=[];try{tasks=JSON.parse(localStorage.getItem('mivaJourneyTasks')||'[]');if(!Array.isArray(tasks))tasks=[];}catch{tasks=[];}
    const save=()=>localStorage.setItem('mivaJourneyTasks',JSON.stringify(tasks));
    const render=()=>{list.replaceChildren();if(!tasks.length){const li=document.createElement('li');li.className='empty';li.textContent='No tasks yet. Add your first task above.';list.append(li);return;}
      tasks.forEach(task=>{const li=document.createElement('li');li.className='task-item'+(task.done?' done':'');const check=document.createElement('input');check.type='checkbox';check.checked=task.done;check.setAttribute('aria-label','Mark task completed');check.addEventListener('change',()=>{task.done=check.checked;save();render();});const text=document.createElement('span');text.className='task-text';text.textContent=task.text;const del=document.createElement('button');del.type='button';del.className='small-btn delete-btn';del.textContent='Delete';del.addEventListener('click',()=>{tasks=tasks.filter(item=>item.id!==task.id);save();render();status.textContent='Task deleted.';});li.append(check,text,del);list.append(li);});};
    taskForm.addEventListener('submit',e=>{e.preventDefault();const value=input.value.trim();if(!value){status.textContent='Please enter a task.';return;}tasks.push({id:Date.now()+Math.random(),text:value,done:false});save();render();input.value='';status.textContent='Task added successfully.';input.focus();});render();
  }
  const contactForm=document.getElementById('contact-form');
  if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('name').value.trim(),email=document.getElementById('email').value.trim(),phone=document.getElementById('phone').value.trim(),message=document.getElementById('message').value.trim(),status=document.getElementById('contact-status');const emailOK=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),phoneOK=/^\d+$/.test(phone);if(!name||!email||!phone||!message){status.textContent='Please complete every field.';status.style.color='#a22';return;}if(!emailOK){status.textContent='Please enter a valid email address.';status.style.color='#a22';return;}if(!phoneOK){status.textContent='Phone number must contain digits only.';status.style.color='#a22';return;}status.textContent='Validation successful. Your message is ready, but this demo form does not send it to a server.';status.style.color='#087b72';});}
});
