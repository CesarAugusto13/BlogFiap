const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { titulo, conteudo, autor } = req.body;
    const newPost = new Post({ titulo, conteudo, autor });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar post', error: error.message });
  }
}; 


exports.getAllPosts = async (req, res) =>{
    try{
        const posts = await Post.find().sort({ createdAt: -1 });
         res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar os posts.', error: error.message });
    }
};


exports.getPostById = async (req, res) => { try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o post.', error: error.message });
  }
};

exports.updatePost = async (req, res) => {try {
    const { titulo, conteudo, autor } = req.body;
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { titulo, conteudo, autor },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post não encontrado para atualização.' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
     if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Erro de validação.', error: error.message });
     }
    res.status(500).json({ message: 'Erro ao atualizar o post.', error: error.message });
}};


exports.deletePost = async (req, res) => { try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Post excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o post.', error: error.message });
  }
};


exports.searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Post.find({
      $or: [
        { titulo: { $regex: q, $options: 'i' } },
        { conteudo: { $regex: q, $options: 'i' } },
        { autor: { $regex: q, $options: 'i' } }
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro na busca', error: error.message });
  }
};