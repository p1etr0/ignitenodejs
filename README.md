#Cadastro de Carro

**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro

**Requisitos não Funcionais**

**Regra de Negocio**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado com disponibilidade por padrão.
* O usuário responsável pelo cadastro deve ser administrador.


#Listagem de Carros
**Requisitos Funcionais**
Deve ser possíve listar todos os carros disponiveis
Deve ser possível listar todos os carros disponiveis pelo nome da categoria
Deve ser possível listar todos os carros disponiveis pelo nome da marca
Deve ser possível listar todos os carros disponiveis pelo nome do carro

**Requisitos não Funcionais**

**Regra de Negocio**
O usuário não precisa estar logado no sistema.



#Cadastro de Especificação no carro
**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação para um carro

**Requisitos não Funcionais**

**Regra de Negocio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro


#Cadastro de Especificação no carro
**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**Requisitos não Funcionais**
Utilizar o multer para upload dos arquivos

**Regra de Negocio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador


# Cadastro de imagens do carro:

**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro

**Requisitos não Funcionais**
Utilizar o multer para upload dos arquivos

**Regra de Negocio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usúario administrador


#Aluguel de Carro
**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel

**Requisitos não Funcionais**


**Regra de Negocio**
O aluguel deve ter duração minima de 24 horas
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para um mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
O Usuário deve estar logado na aplicação
Ao realizar um alguel, o status do carro deverá ser alterado para indisponivel


#Devolução de Carro
**Requisitos Funcionais**
Deve ser possível realizar a devolução de um carro

**Requisitos não Funcionais**


**Regra de Negocio**
Se o carro foi devolvido com menos de 24hrs, deverá ser cobrado diária completa.
Ao realizar a devolução o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuario deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverpa ser cobrado multa proporcionau aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.