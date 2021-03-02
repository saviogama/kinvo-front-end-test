import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SideNav from '../../components/SideNav';
import { BsSearch } from 'react-icons/bs';
import api from '../../services/api';
import { Container, Content, Page, Row, Titulo, Subtitulo, Texto, Card, Session, Div, Select, Search, Input, Divider, Line, Renda, RendaMeio, RendaLine } from './styles';

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            await api.get('getFixedIncomeClassData').then(response => {
                setData(response.data.data.snapshotByProduct);
            });
        })();
    }, [setData]);

    return (
        <Container>
            <Header />
            <Content>
                <SideNav />
                <Page>
                    <Titulo size='24px' color='#4c309b' margin='30px'>Renda Fixa</Titulo>
                    <Row>
                        <Card margin='5px'>
                            <Texto size='8px' color='#707b81'>SALDO BRUTO</Texto>
                            <Subtitulo size='16px' color='#4c309b'>R$ 207.653,10</Subtitulo>
                        </Card>
                        <Card margin='5px'>
                            <Texto size='8px' color='#707b81'>VALOR APLICADO</Texto>
                            <Subtitulo size='16px' color='#4c309b'>R$ 170.025,64</Subtitulo>
                        </Card>
                        <Card margin='5px'>
                            <Texto size='8px' color='#707b81'>RESULTADO</Texto>
                            <Subtitulo size='16px' color='#4c309b'>R$ 37.638,46</Subtitulo>
                        </Card>
                        <Card margin='5px'>
                            <Texto size='8px' color='#707b81'>RENTABILIDADE</Texto>
                            <Subtitulo size='16px' color='#4c309b'>25,08%</Subtitulo>
                        </Card>
                        <Card margin='5px'>
                            <Texto size='8px' color='#707b81'>CDI</Texto>
                            <Subtitulo size='16px' color='#4c309b'>23,68%</Subtitulo>
                        </Card>
                        <Card>
                            <Texto size='8px' color='#707b81'>% SOBRE CDI</Texto>
                            <Subtitulo size='14px' color='#4c309b'>320%</Subtitulo>
                        </Card>
                    </Row>
                    <Session>
                        <Row>
                            <Titulo size='18px' color='#707b81' margin='10px' marginLeft='10px'>Minhas Rendas Fixas</Titulo>
                            <Div>
                                <Select >
                                    <option value='' selected disabled>Ordenar por</option>
                                    <option value='1'>Título</option>
                                    <option value='2'>Classe</option>
                                    <option value='3'>Valor</option>
                                    <option value='4'>Vencimento</option>
                                </Select>
                                <Search>
                                    <BsSearch style={{ marginLeft: "1rem", position: "absolute" }} color="#707b81" />
                                    <Input placeholder='Pesquisar' />
                                </Search>
                            </Div>
                        </Row>
                        <Divider />
                        {data && data.map(item => (
                            <Line>
                                <Renda>
                                    <RendaLine>
                                        <Titulo size='10px' color='#707b81' margin='10px'>TÍTULO</Titulo>
                                        <Texto size='10px' color='#707b81'> </Texto>
                                        <Texto size='10px' color='#707b81'>{item.fixedIncome.name}</Texto>
                                    </RendaLine>
                                    <RendaLine>
                                        <Texto size='8px' color='#707b81'>CLASSE</Texto>
                                        <Subtitulo size='12px' color='#8a51ba'>{item.fixedIncome.bondType}</Subtitulo>
                                    </RendaLine>
                                </Renda>
                                <RendaMeio>
                                    <RendaLine>
                                        <Titulo size='10px' color='#707b81' margin='10px'>MINHA POSIÇÃO</Titulo>
                                        <Texto size='8px' color='#707b81'>VALOR INVES.</Texto>
                                        <Subtitulo size='16px' color='#38bfa0'>{item.position.valueApplied}</Subtitulo>
                                    </RendaLine>
                                    <RendaLine>
                                        <Texto size='8px' color='#707b81'>SALDO BRUTO</Texto>
                                        <Subtitulo size='16px' color='#38bfa0'>{item.position.equity}</Subtitulo>
                                    </RendaLine>
                                    <RendaLine>
                                        <Texto size='8px' color='#707b81'>RENT.</Texto>
                                        <Subtitulo size='16px' color='#38bfa0'>{item.position.profitability}%</Subtitulo>
                                    </RendaLine>
                                    <RendaLine>
                                        <Texto size='8px' color='#707b81'>% DA CART.</Texto>
                                        <Subtitulo size='16px' color='#38bfa0'>{item.position.portfolioPercentage}%</Subtitulo>
                                    </RendaLine>
                                    <RendaLine>
                                        <Texto size='8px' color='#707b81'>CDI</Texto>
                                        <Subtitulo size='16px' color='#38bfa0'>{item.position.indexerValue}</Subtitulo>
                                    </RendaLine>
                                    <RendaLine>
                                        <Texto size='8px' color='#707b81'>SOBRE CDI</Texto>
                                        <Subtitulo size='16px' color='#38bfa0'>{item.position.percentageOverIndexer}%</Subtitulo>
                                    </RendaLine>
                                </RendaMeio>
                                <Renda>
                                    <RendaLine>
                                        <Titulo size='10px' color='#707b81' margin='10px'>VENCIMENTO</Titulo>
                                        <Texto size='10px' color='#707b81'>DATA VENC.</Texto>
                                        <Texto size='10px' color='#008dcb'>{item.due.date}</Texto>
                                    </RendaLine>
                                    <RendaLine>
                                        <Texto size='8px' color='#707b81'>DIAS ATÉ VENC.</Texto>
                                        <Subtitulo size='16px' color='#008dcb'>{item.due.daysUntilExpiration}</Subtitulo>
                                    </RendaLine>
                                </Renda>
                            </Line>
                        ))}
                    </Session>
                </Page>
            </Content>
        </Container>
    );
}