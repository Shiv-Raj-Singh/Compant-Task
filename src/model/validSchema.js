import Joi  from"joi"

const bookSchema = Joi.object({
  publisher: Joi.string().required().trim().regex(/^[a-zA-Z0-9(/ )]*$/).message('Publisher Name Should be Valid !').lowercase(),
  books: Joi.array().items(
    Joi.object({
      name: Joi.string().required().regex(/^[a-zA-Z0-9(/ )]*$/).message('Book-Name Should be Valid !'),
      language: Joi.string().required().regex(/^[a-zA-Z( \)]*$/).message('Language Should be Valid Name !'),
      reviews: Joi.array().items(
        Joi.object({
          message: Joi.string().min(5).message('Message Min 5 words Required !').max(500).message('Message Max 500 words Required !'),
          rating: Joi.number().min(1).message('Rating Min 1').max(5).message('Rating Min 5'),          
          isContained : Joi.boolean(),
          postDate : Joi.string()
        })
      ),
    })
  ),
});

export const validPublisher = Joi.object({
  publisher: Joi.string().required().regex(/^[a-zA-Z(/0-9)]*$/).message('Publisher Name Should be Valid !'),
})

export default bookSchema