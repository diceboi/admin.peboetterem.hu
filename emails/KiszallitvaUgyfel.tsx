import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface KiszallitvaUgyfelProps {
    nev: string;
  }
  
  export const KiszallitvaUgyfel = ({nev}:KiszallitvaUgyfelProps) => (
    <Html>
      <Head />
      <Preview>Rendelésed elkészült!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src='https://peboetterem-online-rendeles.vercel.app/_next/image?url=%2Fpebo-hero-logo.png&w=384&q=75' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
          <Heading style={{...h1, textAlign: 'center'}}>Kedves {nev}, rendelésedet átadtuk a futárnak.</Heading>
          <Text style={{ ...text, marginBottom: '24px'}}>
            Az email megérkezését követően várhatóan  kb. 10-15 perc múlva megérkezik a rendelésed.
          </Text>
          <Text style={{...text}}>
            Jó étvágyat kívánunk! :)
          </Text>
          <Text style={{...text}}>
            Ha a rendeléssel kapcsolatban bármilyen kérdésed, kérésed, javaslatod lenne, keress minket bátran az alábbi elérhetőségeink egyikén:
          </Text>
          <Text style={{...text}}>
            Telefon: <a style={{...link}} href='tel:0682310633'>06 82 310 633</a>, vagy <a style={{...link}} href='tel:06304940959'>06 30 494 0959</a>
          </Text>
          <Text style={{...text}}>
            Email: <a style={{...link}} href='mailto:info@peboetterem.hu'>info@peboetterem.hu</a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default KiszallitvaUgyfel;
  
  const main = {
    backgroundColor: '#ffffff',
  };
  
  const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto',
    background: '#2a2d36',
    borderRadius: '15px'
  };
  
  const h1 = {
    color: '#dcad4d',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '36px',
    fontWeight: 'bold',
    margin: 'auto',
    marginTop: '20px',
    padding: '0',
  };
  
  const link = {
    color: '#dcad4d',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
  };
  
  const text = {
    color: '#dadada',
    fontFamily:
      "'Inter', sans-serif",
    fontSize: '14px',
    
  };
  
  const footer = {
    color: '#898989',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    marginBottom: '24px',
  };
  
  const code = {
    display: 'inline-block',
    padding: '16px 4.5%',
    width: '90.5%',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    border: '1px solid #eee',
    color: '#333',
  };

  const grid = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    borderRadius: '15px',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#3a3f47'
  }
  