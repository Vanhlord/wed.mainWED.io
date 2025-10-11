const socket = io('/front', { transports: ['websocket'] });

    const agentsEl = document.getElementById('agents');
    const state = {};

    function renderAgent(id) {
      let el = document.getElementById('agent-' + id);
      if (!el) {
        el = document.createElement('div');
        el.id = 'agent-' + id;
        el.className = 'card';
        agentsEl.prepend(el);
      }
      const d = state[id];
      if (!d) return;
      el.innerHTML = `<strong>Agent:</strong> ${id}<br/>
        <small>Last: ${new Date(d.ts).toLocaleTimeString()}</small>
        <div class="grid">
          <div><b>CPU</b><pre>Load: ${d.cpu.currentLoad.toFixed(1)}% | Avg: ${d.cpu.avgLoad}</pre></div>
          <div><b>Memory</b><pre>Used: ${(d.mem.used/1024/1024).toFixed(0)} MB / ${(d.mem.total/1024/1024).toFixed(0)} MB</pre></div>
          <div><b>GPU</b><pre>${(d.gpu.length? JSON.stringify(d.gpu[0], null, 2): 'N/A')}</pre></div>
        </div>`;
    }

    socket.on('connect', ()=> console.log('Front connected'));
    socket.on('agent-update', ({agentId, data}) => {
      state[agentId] = {...data};
      renderAgent(agentId);
    });
    socket.on('agent-disconnect', ({agentId})=>{
      const el = document.getElementById('agent-'+agentId);
      if(el) el.style.opacity = 0.5;
    });