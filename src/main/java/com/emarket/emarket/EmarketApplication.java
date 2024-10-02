package com.emarket.emarket;


import org.hibernate.annotations.SourceType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.emarket.emarket.model") // paquete de entidades
@EnableJpaRepositories(basePackages = "com.emarket.emarket.repository") // El paquete donde están los repositorios


public class EmarketApplication {


    }
