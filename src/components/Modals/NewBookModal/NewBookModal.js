import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import BasicModal from '../../common/BasicModal/BasicModal';
import DescriptionRating from '../../common/DescriptionRating/DescriptionRating';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const NewBookModal = ({ open, onClose }) => {

  const validationSchema = Yup.object().shape({
    bookTitle: Yup.string()
    .required()
    .min(1, 'Please enter something'),
    bookThoughts: Yup.string()
    .required()
    .min(1, 'Please enter something'),
    bookRating: Yup.number()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const addBook = (data) => {
    console.log(data)
  }

  const newBookStyle = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    textField: {
      display: 'flex',
      flexDirection: 'column',
      margin: '5px 0px',
    },
    ratingWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }
  }


  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="New Book"
      onSubmit={handleSubmit(addBook)}
    >
      <Box sx={newBookStyle.wrapper}>
        {/* <Input placeholder="Title" />
        <Input placeholder="Thoughts" /> */}
        <TextField
          label="Book Title"
          placeholder="..."
          name="bookTitle"
          sx={newBookStyle.textField}
          required
          {...register('bookTitle')}
          error={errors.bookTitle ? true : false}
          helperText={errors.bookTitle?.message}
        />
        <TextField
          label="Thoughts"
          placeholder="..."
          name="bookThoughts"
          sx={newBookStyle.textField}
          required
          {...register('bookThoughts')}
          error={errors.bookThoughts ? true : false}
          helperText={errors.bookThoughts?.message}
        />
        <Box
          sx={newBookStyle.ratingWrapper}
        >
          {/* TODO: Get value out of this somehow, i think we just
          pass a function down to retreive it. */}
          <DescriptionRating
          />
        </Box>
      </Box>
    </BasicModal>
  )
}

export default NewBookModal