import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';

const UpdatePost = () => {
  const location = useLocation();
  const { post } = location.state;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [indForMessage, setIndForMessage] = useState(0);
  const [updPost, setUpdPost] = useState<Post>({
    id: post.id,
    companySigDate: post.companySigDate ? post.companySigDate : '',
    companySignatureName: post.companySignatureName
      ? post.companySignatureName
      : '',
    documentName: post.documentName ? post.documentName : '',
    documentStatus: post.documentStatus ? post.documentStatus : '',
    documentType: post.documentType ? post.documentType : '',
    employeeNumber: post.employeeNumber !== null ? post.employeeNumber : 0,
    employeeSigDate: post.employeeSigDate ? post.employeeSigDate : '',
    employeeSignatureName: post.employeeSignatureName
      ? post.employeeSignatureName
      : '',
  });

  const onUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/ru/data/v3/testmethods/docs/userdocs/set/${post.id}`,
        {
          companySigDate: updPost.companySigDate,
          companySignatureName: updPost.companySignatureName,
          documentName: updPost.documentName,
          documentStatus: updPost.documentStatus,
          documentType: updPost.documentType,
          employeeNumber: updPost.employeeNumber,
          employeeSigDate: updPost.employeeSigDate,
          employeeSignatureName: updPost.employeeSignatureName,
        },
        {
          headers: { 'x-auth': `${token}` },
        }
      );
      navigate('/');
    } catch (err) {
      console.log('Error updating post:', err);
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
          Редактировать документ
        </Typography>
      )}

      <form onSubmit={onUpdatePost} className="createForm">
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
          value={dayjs(updPost.companySigDate).format('YYYY-MM-DD HH:mm:ss')}
          onChange={(e) =>
            setUpdPost({ ...updPost, companySigDate: e.target.value })
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
          value={updPost.companySignatureName}
          onChange={(e) =>
            setUpdPost({ ...updPost, companySignatureName: e.target.value })
          }
        />
        <TextField
          type="text"
          placeholder="Название документа"
          variant="outlined"
          color="primary"
          sx={{
            mb: 2,
            width: { sm: '48%', xs: '100%' },
          }}
          fullWidth
          value={updPost.documentName}
          onChange={(e) =>
            setUpdPost({ ...updPost, documentName: e.target.value })
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
          value={updPost.documentStatus}
          onChange={(e) =>
            setUpdPost({ ...updPost, documentStatus: e.target.value })
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
          value={updPost.documentType}
          onChange={(e) =>
            setUpdPost({ ...updPost, documentType: e.target.value })
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
          value={updPost.employeeNumber}
          onChange={(e) =>
            setUpdPost({ ...updPost, employeeNumber: e.target.value })
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
          value={dayjs(updPost.employeeSigDate).format('YYYY-MM-DD HH:mm:ss')}
          onChange={(e) =>
            setUpdPost({ ...updPost, employeeSigDate: e.target.value })
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
          value={updPost.employeeSignatureName}
          onChange={(e) =>
            setUpdPost({ ...updPost, employeeSignatureName: e.target.value })
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
            Редакт.
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

export default UpdatePost;
