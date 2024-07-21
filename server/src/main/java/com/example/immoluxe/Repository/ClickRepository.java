package com.example.immoluxe.Repository;

import com.example.immoluxe.Entity.Click;
import com.example.immoluxe.Entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClickRepository extends JpaRepository<Click, Long> {
    List<Click> findByProperty(Property property);
}
