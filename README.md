# Manual de uso

## Atualizando a versão da imagem docker para a versão mais recente

```
A fazer
```

# Setup em ambiente de produção (Ubuntu 16.04)

Ao logar no servidor, execute os comandos abaixo:

## Clonando o rep do projeto:

```
sudo mkdir /usr/local/ui-service;
sudo git clone https://github.com/marcoprado17/scife-ui-service /usr/local/ui-service;
```

## Instalando docker-ce=17.12.0~ce-0~ubuntu

```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common -y;
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable";
sudo apt-get update;
sudo apt-get install docker-ce=17.12.0~ce-0~ubuntu -y;
```

## Instalando docker-compose=1.19.0

```
sudo curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose;
sudo chmod +x /usr/local/bin/docker-compose;
```

## Iniciando a aplicação e o mongo:

```
sudo docker-compose -f /usr/local/ui-service/devops/docker-compose.yml up -d;
```
