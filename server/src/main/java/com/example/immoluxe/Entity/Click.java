package com.example.immoluxe.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="clicks_table")
public class Click {

    public Click() {}

    public Click(LocalDateTime timestamp, Property property) {
        this.timestamp = timestamp;
        this.property = property;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}
