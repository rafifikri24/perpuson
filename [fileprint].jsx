import "bootstrap/dist/css/bootstrap.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect,useState } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
import QRCode from 'qrcode.react';


function GridExample() {
  const router = useRouter()
  const { fileprint } = router.query
  const[buku,setBuku]=useState([])
  console.log(fileprint)

    useEffect(() => {
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        if(fileprint==='semua'){
          axios.get("http://localhost:5000/tampil/book", config)
          .then((response) => {
            setBuku(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
        }else{
            axios.get(`http://localhost:5000/tampil/book/${fileprint}`, config)
            .then((response) => {
              setBuku(response.data)
            })
            .catch((error) => {
              console.log(error);
            });
        }
          
      } else {
        console.log('not login')
        router.push('/');
      }
    }, [])

    const handlePrint = () => {
      window.print();
    };
    useEffect(() => {
      if (buku.length > 0) {
        handlePrint();
      }
    }, [buku]);

    useEffect(() => {
      const handlePrintEvent = () => {
        router.back();
      };  
      window.addEventListener('afterprint', handlePrintEvent);
      return () => {
        window.removeEventListener('afterprint', handlePrintEvent);
      };
    }, []);
  return (
    <div style={{ marginLeft:'5%', marginRight:'5%'}}>
      <center>
        <Row xs={3} md={3} style={{padding:0}}>
        {buku.map((item)=>{
          const qrValue = `${item.kode_buku}`
          return(
          <Col
          key={item.kode_buku}
          style={{ maxWidth: '300px', padding: 2 }}
          
        >
            <Card style={{ maxWidth: '300px',height:'234px', border: 'solid 2px black' }}>
              <Card.Body>
                <Card.Title style={{height:'70px'}}>{item.judul_buku}</Card.Title>
                <Card.Text>
                {item.kode_buku}
                </Card.Text>
                <Card.Text>
                {<QRCode value={qrValue} style={{width:'50px',height:'50px'}}/>}
                {item.pengarang}
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
          )}
        )}
      </Row>
    </center>
    </div>
  );


}

export default GridExample;


<style>
  {`
    @page {
      size: A4 landscape;
    }
    .margin-top-7 {
      margin-top: 100px;
    }
  `}
</style>