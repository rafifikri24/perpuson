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

    useEffect(() => {
      const token = localStorage.getItem('tokenjwt');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        if(fileprint==='semua'){
          axios.get("https://perpus-smk-delta.vercel.app/tampil/book", config)
          .then((response) => {
            setBuku(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
        }else{
            axios.get(`https://perpus-smk-delta.vercel.app/tampil/book/${fileprint}`, config)
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

    // const handlePrint = () => {
    //   window.print();
    // };
    // useEffect(() => {
    //   if (buku.length > 0) {
    //     handlePrint();
    //   }
    // }, [buku]);

    // useEffect(() => {
    //   const handlePrintEvent = () => {
    //     router.back();
    //   };  
    //   window.addEventListener('afterprint', handlePrintEvent);
    //   return () => {
    //     window.removeEventListener('afterprint', handlePrintEvent);
    //   };
    // }, []);
  return (
    <div style={{ marginLeft:'5%', marginRight:'5%'}}>
      <center>
        <Row xs={5} md={4}>
        {buku.map((item)=>{
          const qrValue = `${item.kode_buku}`
          return(
          <Col
          key={item.kode_buku}
          style={{ border:'1px solid black',height:'4.5cm', width:'6cm', margin:1}}
        >
            <Card style={{border: 'none' , maxHeight:'4.4cm'}}>
              <Card.Body>
                <Card.Title style={{height:'30px',fontSize:'12px'}}>{item.judul_buku}</Card.Title>
                <Card.Text  style={{fontSize:'10px',marginTop:'10px'}}>
                {item.kode_buku}
                </Card.Text>
                <Card.Text>
                {<QRCode value={qrValue} style={{width:'1.7cm',height:'1.7cm'}}/>}
                </Card.Text>
                {/* <Card.Text>
                {item.pengarang}
                </Card.Text> */}
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
  `}
</style>