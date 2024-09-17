import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const Main = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const [loading, setLoading] = useState<boolean>(true);
  const [postsList, setPostsList] = useState<Post[] | null>(null);

  const getPosts = async () => {
    try {
      let res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/ru/data/v3/testmethods/docs/userdocs/get`,
        {
          headers: { 'x-auth': `${token}` },
        }
      );

      setPostsList(
        res.data.data.map((item: Post) => ({
          id: item.id,
          companySigDate: item.companySigDate,
          companySignatureName: item.companySignatureName,
          documentName: item.documentName,
          documentStatus: item.documentStatus,
          documentType: item.documentType,
          employeeNumber: item.employeeNumber,
          employeeSigDate: item.employeeSigDate,
          employeeSignatureName: item.employeeSignatureName,
        }))
      );
      setLoading(false);
    } catch (err) {
      console.log('Error get posts:', err);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        {
          headers: { 'x-auth': `${token}` },
        }
      );
      getPosts();
    } catch (err) {
      console.log('Error deleting post:', err);
    }
  };

  useEffect(() => {
    if (!token) navigate('/login');
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="./sp.svg" style={{ width: '80px', marginTop: '20%' }} />
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 4,
          width: '94vw',
        }}
      >
        <Button
          sx={{ fontWeight: '700', fontSize: '12px' }}
          color="primary"
          variant="contained"
          onClick={() => navigate('/new')}
        >
          Добавить
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          width: { xs: '80vw', sm: '94vw' },
          mt: 2,
          mb: 5,
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                borderTop: '2px solid #999999',
                borderBottom: '2px solid #999999',
                '& th': {
                  fontSize: '14px',
                  fontWeight: '700',
                  color: 'secondary.main',
                },
              }}
            >
              <TableCell>Дата подписи компании</TableCell>
              <TableCell>Имя подписанта компании</TableCell>
              <TableCell>Название документа</TableCell>
              <TableCell>Статус документа</TableCell>
              <TableCell>Тип документа</TableCell>
              <TableCell>Номер сотрудника</TableCell>
              <TableCell>Дата подписи сотрудника</TableCell>
              <TableCell>Имя сотрудника</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postsList?.map((post) => (
              <TableRow
                key={post.id}
                style={{ marginLeft: 5 }}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& td': { color: 'secondary.main' },
                }}
              >
                <TableCell>
                  {dayjs(post.companySigDate).format('DD/MM/YYYY HH:mm:ss')}
                </TableCell>
                <TableCell>{post.companySignatureName}</TableCell>
                <TableCell>{post.documentName}</TableCell>
                <TableCell>{post.documentStatus}</TableCell>
                <TableCell>{post.documentType}</TableCell>
                <TableCell>{post.employeeNumber}</TableCell>
                <TableCell>
                  {dayjs(post.employeeSigDate).format('DD/MM/YYYY HH:mm:ss')}
                </TableCell>
                <TableCell>{post.employeeSignatureName}</TableCell>
                <TableCell>
                  <div style={{ paddingLeft: 0, marginLeft: 0 }}>
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <Button
                        type="button"
                        style={{
                          marginRight: 5,
                          fontWeight: '700',
                          fontSize: '10px',
                          borderRadius: '5px',
                        }}
                        color="primary"
                        variant="contained"
                      >
                        <Link
                          style={{ textDecoration: 'none', color: 'white' }}
                          to="/update"
                          state={{ post: post }}
                        >
                          Редакт.
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        style={{
                          marginRight: 5,
                          fontWeight: '700',
                          borderRadius: '5px',
                          fontSize: '10px',
                        }}
                        color="warning"
                        variant="contained"
                        onClick={() => deletePost(post.id)}
                      >
                        Удалить
                      </Button>
                    </ButtonGroup>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Main;
