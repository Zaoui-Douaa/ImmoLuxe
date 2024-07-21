package com.example.immoluxe.Service;

import com.example.immoluxe.Entity.Contrat;
import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.TypeContrat;
import com.example.immoluxe.Entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface IContratService {

    Contrat AddContrat(Contrat contrat);
    List<Contrat> GetAllContrat();
    public ResponseEntity<Contrat> updateContratByID(Long id,Contrat contrat);
public ResponseEntity<Contrat> getContratByID(Long id) ;
    public ResponseEntity<Map<String, Boolean>> deleteContrat(@PathVariable Long id);
    public String getUserName(Authentication authentication);
/*
    TypeContrat GetContratTypeById(Long id);
    List<Contrat> GetAllContratByType(TypeContrat type);
    Contrat UpdateContrat(Contrat contrat);
    User GetClientByIdContrat(Long id);
    User GetProprietaireByIdContrat(Long id);
    User GetAgentByIdContrat(Long id);

    Contrat deleteContrat(Contrat contrat);
*/
}
