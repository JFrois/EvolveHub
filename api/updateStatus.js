// api/updateStatus.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { statuses } = req.body;
    console.log('Status recebidos:', statuses);
    // Aqui você pode adicionar lógica para salvar o status em um banco de dados
    return res.status(200).json({ message: 'Status atualizado com sucesso!' });
  }
  
  return res.status(405).json({ message: 'Método não permitido' });
}
