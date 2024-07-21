package com.example.immoluxe.Service;

import com.example.immoluxe.Entity.Contrat;
import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.TypeContrat;
import com.example.immoluxe.Entity.User;
import com.example.immoluxe.Repository.ContratRepository;

import lombok.AllArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class ContratServiceImp implements IContratService {
    ContratRepository contratRep ;
    @Override
    public Contrat AddContrat(Contrat contrat) {
        return contratRep.save(contrat);
    }
    @Override
    public List<Contrat> GetAllContrat() {
        return contratRep.findAll();
    }

    @Override
    public ResponseEntity<Contrat> updateContratByID(@PathVariable  Long id,@RequestBody Contrat contrat) {
            Contrat Ncontrat = contratRep.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Contrat with id "+id+" does not exist"));

        Ncontrat.setTypeContrat(contrat.getTypeContrat());
        Ncontrat.setDateDebut(contrat.getDateDebut());
        Ncontrat.setDateFin(contrat.getDateFin());
        Ncontrat.setMontant(contrat.getMontant());
            Contrat updatedcontrat = contratRep.save(Ncontrat);

            return ResponseEntity.ok(updatedcontrat);
    }

    @Override
    public ResponseEntity<Contrat> getContratByID(Long id) {
        Contrat contrat = contratRep.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contrat with id "+id+" does not exist"));
        return ResponseEntity.ok(contrat);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> deleteContrat(Long id) {
        Contrat contrat = contratRep.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contrat with id "+id+" does not exist"));

        contratRep.delete(contrat);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    public String getUserName(Authentication connecteduser){
            Jwt jwt = (Jwt) connecteduser.getPrincipal();
            return jwt.getClaimAsString("preferred_username");
        }



/*

    @Override
    public Contrat deleteContrat(Contrat contrat) {
        contratRep.delete(contrat);
        return contratRep.findById(Long.valueOf(contrat.getId())).orElse(null);
    }
    @Override
    public TypeContrat GetContratTypeById(Long id) {
        return contratRep.findById(id).get().getTypeContrat();
    }

    @Override
    public List<Contrat> GetAllContratByType(TypeContrat type) {
        // Récupérer tous les contrats
        List<Contrat> allContrats = contratRep.findAll();

        // Filtrer les contrats par type
        List<Contrat> contratsByType = allContrats.stream()
                .filter(contrat -> contrat.getTypeContrat() == type)
                .collect(Collectors.toList());

        return contratsByType;
    }

    @Override
    public Contrat UpdateContrat(Contrat contrat ) {
        return contratRep.save(contrat);
    }

    @Override
    public User GetClientByIdContrat(Long id) {
        return null;
    }

    @Override
    public User GetProprietaireByIdContrat(Long id) {
        return null;
    }

    @Override
    public User GetAgentByIdContrat(Long id) {
        return null;
    }

    /*
    @Override
    public User GetClientByIdContrat(Long id) {
        return contratRep.findById(id).get().getClient();
    }
    /*
    @Override
    public User GetProprietaireByIdContrat(Long id) {
        return contratRep.findById(id).get().getProperty().getProprietaire();
    }

    @Override
    public User GetAgentByIdContrat(Long id) {
        return contratRep.findById(id).get().getAgent();
    }


*/
}
