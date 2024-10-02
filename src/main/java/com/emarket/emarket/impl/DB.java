package com.emarket.emarket.impl;

import java.sql.*;

public class DB {
    public static void main (String [] args)  {

        String url = "jdbc:mysql://localhost:3306/emarket_db";
        String username = "root";
        String password = "gaomon94";

        try {

            Connection connection = DriverManager.getConnection(url, username, password);
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from product");


            while (resultSet.next()){
                System.out.println(resultSet.getString("id") + " " + "|" + resultSet.getString("name")
                        + " " + resultSet.getString("description")
                );
            }

            connection.close();
            statement.close();
            resultSet.close();

        }
        catch (SQLException e){
            e.printStackTrace();
        }
    }

}
