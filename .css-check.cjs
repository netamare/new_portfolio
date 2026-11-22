fetch('http://localhost:3000').then(r=>r.text()).then(t=>console.log([...t.matchAll(/globals_css[^" ]+/g)].map(x=>x[0])))
