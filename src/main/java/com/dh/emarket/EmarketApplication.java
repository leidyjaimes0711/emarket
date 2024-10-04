package com.dh.emarket;

import com.dh.emarket.dao.DB;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmarketApplication {

    public static void main(String[] args) {
        DB.createTable();
        SpringApplication.run(EmarketApplication.class, args);

    }
}
