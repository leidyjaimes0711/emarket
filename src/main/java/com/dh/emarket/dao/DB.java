package com.dh.emarket.dao;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DB {
    private static final String URL = "jdbc:mysql://localhost:3306/emarket_db";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "gaomon94";


    private static final String SQL_CREATE = "CREATE TABLE ROOM (ID INT AUTO_INCREMENT PRIMARY KEY, NAME VARCHAR(100) NOT NULL, DESCRIPTION VARCHAR(100) NOT NULL)";

    private static final String SQL_DROP = "DROP TABLE IF EXISTS ROOM; ";

    private static final String SQL_INSERT = "INSERT INTO ROOM"
            + "(NAME, DESCRIPTION)"
            +"VALUES ('habitacion sencilla', '1 cama , 1 tv')";




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
            statement.execute(SQL_DROP);
            statement.execute(SQL_CREATE);
            statement.execute(SQL_INSERT);

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
