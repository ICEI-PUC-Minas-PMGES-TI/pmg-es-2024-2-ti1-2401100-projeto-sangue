# Documentação do Projeto (TIDocs)

Esta pasta armazena a documentação do projeto para a disciplina de **Trabalho Interdisciplinar 1** dos cursos de Tecnologia da Informação da **[PUC Minas](https://pucminas.br)**. Essa documentação é estruturada na forma de um site que fica disponível por meio do GitHub Pages e pode ser incluído, também, no site da solução hospedada. Um [exemplo publicado do TIDocs](https://webtech-puc-minas.github.io/ti1-template/) está disponível por meio do repositório do **[WebTech PUC Minas](https://github.com/webtech-pucminas)**.

A documentação do projeto inclui as seguintes seções:

1. Introdução
2. Contexto
3. Concepção
4. Metodologia
5. Solução
6. FAQ (Questões frequentes)
7. Referências Bibliográficas

O template para o site é estruturado e permite que a equipe evolua a documentação do projeto à medida que avance no desenvolvimento.

# Orientações gerais

Esta seção traz explicações breves sobre o conjunto de artefatos que precisam ser incluídos na documentação do projeto com uma conjunto de links importantes para que se entenda como criar cada coisa. 

## Problema

A falta de informações precisas e a baixa taxa de doadores são problemas recorrentes que dificultam o aumento das doações de sangue. Nosso projeto visa fornecer informações corretas e detalhadas, encorajando a doação e conectando potenciais doadores com quem precisa.

## Objetivos

- **Objetivo Geral**: Desenvolver uma aplicação para conectar doadores de sangue a receptores.
- **Objetivos Específicos**:
  - Facilitar a busca de campanhas de doação e informações sobre o processo.
  - Incentivar a doação de sangue por meio de campanhas e histórias de sucesso.

## Justificativa

Esse projeto é fundamental para aumentar a conscientização sobre a importância da doação de sangue e para ajudar a conectar doadores a quem precisa de forma mais acessível e eficiente. Foi realizada uma pesquisa com entrevistas qualitativas para fundamentar a importância e o escopo da solução proposta.

## Público-Alvo

- **Pessoas que já são doadoras**: Interessados em encontrar campanhas e locais para doar.
- **Familiares de pacientes**: Necessitam de uma plataforma para encontrar rapidamente doadores compatíveis.
- **Interessados em se tornarem doadores**: Precisam de informações confiáveis e incentivo para iniciar.

## Personas

# Personas / Mapas de Empatia

## Persona 1: Maria Aparecida de Oliveira

**Idade:** 35  
**Hobby:** Desenhar  
**Trabalho:** Jornalista  
**Personalidade:** Criativa, alegre, focada, valoriza a família e os amigos.  
**Sonhos:** Viajar o mundo, viver da arte e ter um dia uma obra exposta em um museu ou galeria de arte.

### Objetos e Lugares
**Quais objetos físicos e digitais essa pessoa usa? Quando, onde e como ela os usa?**  
Maria Aparecida faz uso do Facebook, Instagram e WhatsApp. Ela faz uso dessas plataformas para uso pessoal e profissional, para divulgar suas artes e seu trabalho. Maria, por ser jornalista, está sempre dentro das redes sociais para obter notícias e conteúdo. É uma pessoa conectada.

### Objetivos Chave
**Quais são os objetivos chave dessa pessoa durante a utilização do serviço? Por que eles precisam desse serviço?**  
Maria busca uma plataforma onde possa divulgar sua arte e alcançar cada vez mais pessoas, seja por propósito pessoal ou profissional. Como jornalista e artista, deseja que a plataforma permita conexão com seu público e que a arte seja valorizada.

### Como Devemos Tratá-la?
**Como devemos tratá-la para que ela se sinta bem? Quais os tipos de comportamento que deixam essa pessoa feliz?**  
Essa pessoa gosta de conversar e interagir. Ela gosta de receber elogios sobre suas artes e tem um lado criativo forte.

---

## Persona 2: Sergio de Matos Almeida

**Idade:** 60  
**Hobby:** Pescar  
**Trabalho:** Empresário  
**Personalidade:** Amigável, sempre de bom humor, procura ajudar a todos e gosta de viajar.  
**Sonhos:** Construir uma casa no campo para ter seu descanso e ver seus filhos bem na vida.

### Objetos e Lugares
**Quais objetos físicos e digitais essa pessoa usa? Quando, onde e como ela os usa?**  
Sergio lê jornais, utiliza do Facebook, Instagram e WhatsApp. Faz uso dessas plataformas para se manter informado e atualizado dos assuntos atuais e utiliza de forma profissional, tudo isso durante seus horários vagos.

### Objetivos Chave
**Quais são os objetivos chave dessa pessoa durante a utilização do serviço? Por que eles precisam desse serviço?**  
O objetivo chave de Sergio é poder ajudar as outras pessoas, visto que seu filho já precisa de doação de ilesão e conhecer esse mundo agora é um doador frequente. Ele acha que o serviço é muito necessário para ajudar mais vidas, assim como a do seu filho foi salva.

### Como Devemos Tratá-lo?
**Como devemos tratá-lo para que ele se sinta bem? Quais os tipos de comportamento que deixam essa pessoa feliz?**  
Sergio gosta muito de conversar, então uma boa maneira de deixá-lo bem é confortá-lo com um bom papo. Dizer o quanto essas doações ajudam pessoas fazem ele se sentir bem com o que faz, e isso o torna feliz.

---

## Persona 3: Ana Elisa Peixoto Bonfim

**Idade:** 29  
**Hobby:** Curly Corner  
**Trabalho:** Advogada  
**Personalidade:** Uma pessoa justa, não tolera preconceito, está sempre atenta às causas sociais e acredita que o mundo ainda tem jeito.  
**Sonhos:** Conquistar o sucesso profissional e se envolver em causas sociais que ajudam o mundo.

### Objetos e Lugares
**Quais objetos físicos e digitais essa pessoa usa? Quando, onde e como ela os usa?**  
Ana Elisa usa apenas o seu celular. Em seu tempo livre, gosta de ler as notícias do mundo, faz uso do WhatsApp, Instagram, Facebook, Twitter e Reddit, para ficar sempre por dentro do que acontece no mundo.

### Objetivos Chave
**Quais são os objetivos chave dessa pessoa durante a utilização do serviço? Por que eles precisam desse serviço?**  
Ana tem uma irmã que está precisando de doação de sangue, constantemente por uma doença crônica, ela procura incentivar outras pessoas e propagar a informação de doadores compatíveis e dispostos a ajudar sua irmã.

### Como Devemos Tratá-la?
**Como devemos tratá-la para que ela se sinta bem? Quais os tipos de comportamento que deixam essa pessoa feliz?**  
Ana Elisa gosta de ser tratada com respeito, gosta de estimular pessoas a fazerem boas ações. Ela gosta de apresentar suas ideias e pessoas e levá-las às ONGs que ela apoia e ajuda.


## Exploração 1

Requisitos identificados até o momento:
- Publicação de campanhas
- Chat para usuários
- Mapa com pontos de coleta de sangue
- Barra de pesquisa
- Fórum de discussões
- Página inicial com direcionamento
- Favoritar publicações
- Comentários
- Informações sobre doação de sangue

## Projeto de Interface

Baseado nos requisitos, o User Flow foi desenhado com as páginas essenciais: Home, Campanhas, Doe Sangue, Receba uma Doação, Sobre Nós, entre outras. Wireframes foram criados no Figma: [Protótipo no Figma](https://www.figma.com/proto/sX50viTaWAOpkUKbe8NUuY/Hemo%2B?nodeid=132-69&node-type=canvas&t=HNrdEXbRfLpeSW4p-1&scaling=minzoom&content-scaling=fixed&page-id=0%3A1)

## Metodologia

A metodologia utilizada foi o Kanban para controle de tarefas, com o Trello como ferramenta de suporte para organizar o fluxo de trabalho.

## Wireframes

Utilizamos o figma para fazer toda a interface do projeto.
