package com.compliancehub.repository;

import com.compliancehub.model.Customer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Repository
public class CustomerRepositoryJdbc {

    private final JdbcTemplate jdbc;
    public CustomerRepositoryJdbc(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    private static class CustomerRowMapper implements RowMapper<Customer> {
        @Override
        public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {
            int id = rs.getInt("customer_id");
            String name = rs.getString("name");
            String type = rs.getString("institution_type");
            return new Customer(id, name, type);
        }
    }

    public int create(String name, String institutionType) {
        // Postgres supports RETURNING with SERIAL
        return jdbc.queryForObject(
                "INSERT INTO customer (name, institution_type) VALUES (?, ?) RETURNING customer_id",
                (rs, rowNum) -> rs.getInt(1),
                name, institutionType
        );
    }

    public Optional<Customer> find(int id) {
        var list = jdbc.query("SELECT customer_id, name, institution_type FROM customer WHERE customer_id = ?",
                new CustomerRowMapper(), id);
        return list.stream().findFirst();
    }

    public List<Customer> recent(int limit) {
        // No created_at column in your schema → sort by id desc as proxy for recency
        return jdbc.query(
                "SELECT customer_id, name, institution_type FROM customer ORDER BY customer_id DESC LIMIT ?",
                new CustomerRowMapper(), limit
        );
    }

    public boolean update(int id, String name, String institutionType) {
        int rows = jdbc.update(
                """
                UPDATE customer
                   SET name = COALESCE(?, name),
                       institution_type = COALESCE(?, institution_type)
                 WHERE customer_id = ?
                """,
                blankToNull(name), blankToNull(institutionType), id
        );
        return rows > 0;
    }

    public boolean delete(int id) {
        int rows = jdbc.update("DELETE FROM customer WHERE customer_id = ?", id);
        return rows > 0;
    }

    private static String blankToNull(String v) {
        return (v == null || v.isBlank()) ? null : v;
    }
}
