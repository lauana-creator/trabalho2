
//import axios from 'axios';
import React,{useState, useEffect} from 'react';
import {Card,Button, Container, Row} from 'react-bootstrap'
import './index.css'


export default function Main() {
    const [prod,setProd] = useState([])



    useEffect(()=>{
        const fetchData = async ()=>{
            await fetch('http://localhost:8095/api/v1/products')
            .then(response => response.json())
            .then(json => setProd(json))
            .catch(error => console.log(error))
        } 

        fetchData()
    },[])



    return (
        <div className="conteudo">
            <Container >
                <Row xs={3} md={4}>
                    <ul>
                        {
                            prod.map(product =>(
                                <li key = {product.id}>  
                                    
                                    <Card style={{ width: '50rem' }}>
                                            <Card.Body>
                                                <Card.Title>  {product.name} de {product.sabor} </Card.Title>
                                                <Card.Text>
                                                    preço : R$ {product.price}
                                                </Card.Text>
                                                <Button variant="primary"> Comprar </Button>
                                            </Card.Body>
                                    </Card>
                                    
                            
                                
                                </li>
                            ))
                        


                        
                        }

                    </ul>
                </Row>
                

            </Container>
            



        </div>
    )
}
