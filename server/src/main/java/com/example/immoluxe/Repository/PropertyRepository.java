package com.example.immoluxe.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.immoluxe.Entity.Property;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

}