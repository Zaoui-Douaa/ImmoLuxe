package com.example.immoluxe.Repository;

import com.example.immoluxe.Entity.RDV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RDVRepository extends JpaRepository<RDV, Integer> {

}
