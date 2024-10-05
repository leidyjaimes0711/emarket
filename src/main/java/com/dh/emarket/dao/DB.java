package com.dh.emarket.dao;


import javax.persistence.Entity;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
@Entity
public class DB {
    private static final String URL = "jdbc:mysql://localhost:3306/emarket_db";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "gaomon94";


    // Método estático para obtener la conexión
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }

    // Método main para probar la conexión
    public static void main(String[] args) {
        Connection conn = null;
        try {
            conn = getConnection();
            System.out.println("Conexión exitosa a la base de datos.");
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }


    public static void createTable(){
        Connection connection = null;
        try{

            connection = getConnection();
            Statement statement = connection.createStatement();


        }catch(Exception e){
            e.printStackTrace();
        }finally {
            try{
                connection.close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }
}
