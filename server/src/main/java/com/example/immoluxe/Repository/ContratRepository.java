package com.example.immoluxe.Repository;

import com.example.immoluxe.Entity.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ContratRepository extends JpaRepository<Contrat,Long>{
}
