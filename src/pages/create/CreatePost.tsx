import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';

const today = new Date();

const CreatePost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [indForMessage, setIndForMessage] = useState(0);
  const [newPost, setNewPost] = useState<Post>({
    id: '',
    companySigDate: today.toISOString(),
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: today.toISOString(),
    employeeSignatureName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/ru/data/v3/testmethods/docs/userdocs/create`,
        {
          companySigDate: newPost.companySigDate,
          companySignatureName: newPost.companySignatureName,
          documentName: newPost.documentName,
          documentStatus: newPost.documentStatus,
          documentType: newPost.documentType,
          employeeNumber: newPost.employeeNumber,
          employeeSigDate: newPost.employeeSigDate,
          employeeSignatureName: newPost.employeeSignatureName,
        },
        {
          headers: { 'x-auth': `${token}` },
        }
      );
      navigate('/');
    } catch (err) {
      console.log('Error creating post:', err);
      setIndForMessage(1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 5,
        mb: 5,
      }}
    >
      {indForMessage === 1 ? (
        <Typography
          variant="h5"
          sx={{
            color: 'red',
            mb: 3,
            width: { xs: '60vw' },
            textAlign: 'center',
          }}
        >
          Название документа и статус документа обязательны
        </Typography>
      ) : (
        <Typography
          variant="h5"
          sx={{
            color: 'primary.dark',
            mb: 3,
            width: { xs: '60vw' },
            textAlign: 'center',
          }}
        >
          Новый документ
        </Typography>
      )}
      <form className="createForm" autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          type="datetime-local"
          variant="filled"
          color="primary"
          label="Дата подписи компании"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={dayjs(newPost.companySigDate).format('YYYY-MM-DD HH:mm:ss')}
          onChange={(e) =>
            setNewPost({ ...newPost, companySigDate: e.target.value })
          }
        />
        <TextField
          type="text"
          placeholder="Имя подписанта компании"
          variant="outlined"
          color="primary"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={newPost.companySignatureName}
          onChange={(e) =>
            setNewPost({ ...newPost, companySignatureName: e.target.value })
          }
        />
        <TextField
          type="text"
          placeholder="Название документа"
          name="documentName"
          variant="outlined"
          color="primary"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={newPost.documentName}
          onChange={(e) =>
            setNewPost({ ...newPost, documentName: e.target.value })
          }
        />
        <TextField
          type="text"
          placeholder="Статус документа"
          variant="outlined"
          color="primary"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={newPost.documentStatus}
          onChange={(e) =>
            setNewPost({ ...newPost, documentStatus: e.target.value })
          }
        />
        <TextField
          type="text"
          placeholder="Тип документа"
          variant="outlined"
          color="primary"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={newPost.documentType}
          onChange={(e) =>
            setNewPost({ ...newPost, documentType: e.target.value })
          }
        />
        <TextField
          type="text"
          placeholder="Номер сотрудника"
          variant="outlined"
          color="primary"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={newPost.employeeNumber}
          onChange={(e) =>
            setNewPost({
              ...newPost,
              employeeNumber: e.target.value,
            })
          }
        />
        <TextField
          type="datetime-local"
          variant="filled"
          color="primary"
          label="Дата подписи сотрудника"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={dayjs(newPost.employeeSigDate).format('YYYY-MM-DD HH:mm:ss')}
          onChange={(e) =>
            setNewPost({ ...newPost, employeeSigDate: e.target.value })
          }
        />
        <TextField
          type="text"
          placeholder="Имя сотрудника"
          variant="outlined"
          color="primary"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={newPost.employeeSignatureName}
          onChange={(e) =>
            setNewPost({ ...newPost, employeeSignatureName: e.target.value })
          }
        />

        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          sx={{
            marginTop: '15px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            style={{
              marginRight: 5,
              marginTop: 5,
              background: '#fff',
              height: '35px',
              borderRadius: '5px',
              fontWeight: '700',
            }}
          >
            Создать
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            style={{
              marginRight: 5,
              marginTop: 5,
              background: '#fff',
              height: '35px',
              borderRadius: '5px',
              fontWeight: '700',
            }}
            onClick={() => navigate('/')}
          >
            Отмена
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default CreatePost;
