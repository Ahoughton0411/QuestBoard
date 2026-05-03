export default async (req) => {
  const key = Netlify.env.get('ANTHROPIC_API_KEY');
  if (!key) return new Response(JSON.stringify({error:{message:'No API key configured'}}),{status:500,headers:{'Content-Type':'application/json'}});
  const res = await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},
    body: await req.text()
  });
  const data = await res.json();
  return new Response(JSON.stringify(data),{status:res.status,headers:{'Content-Type':'application/json'}});
};
