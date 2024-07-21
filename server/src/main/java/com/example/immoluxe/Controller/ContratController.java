package com.example.immoluxe.Controller;

import com.example.immoluxe.Entity.Contrat;
import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.TypeContrat;
import com.example.immoluxe.Service.IContratService;
import lombok.AllArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class ContratController {
    IContratService contratService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path="/contrat")
    List<Contrat> getAllContrat(){
        return  contratService.GetAllContrat();}


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path="/contrat")
    Contrat ajouterContrat(@RequestBody Contrat contrat){
            return contratService.AddContrat(contrat);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/contrat/{id}")
    public ResponseEntity<Contrat> getContratByID(@PathVariable Long id) {
        return contratService.getContratByID(id);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/contrat/{id}")
    public ResponseEntity<Contrat> updateContratByID(@PathVariable Long id, @RequestBody Contrat contrat){
        return contratService.updateContratByID(id,contrat);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/contrat/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteContrat(@PathVariable Long id) {

    return contratService.deleteContrat(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping(path="/username")
    String getUserName(Authentication con){
        return  contratService.getUserName(con);}


    /*
    @DeleteMapping("/contrat")
    Contrat deleteContrat(@RequestBody Contrat contrat){
            return contratService.deleteContrat(contrat);
    }
    @DeleteMapping("/contrat/{id}")
    boolean deleteContratByID(@PathVariable Long id){return contratService.deleteContratById(id);}
    @GetMapping("/contrat/{id}")
    ResponseEntity<Contrat> getContratById(@PathVariable Long id) {
        Contrat contrat = contratService.GetContratById(id);
        return ResponseEntity.ok(contrat);
    }

    @GetMapping("/contrat/type/{type}")
    ResponseEntity<List<Contrat>> getContratsByType(@PathVariable TypeContrat type) {
        List<Contrat> contrats = contratService.GetAllContratByType(type);
        return ResponseEntity.ok(contrats);
    }

   @GetMapping(path="/contrat/getType/{id}")
    TypeContrat getTypeContrat(@PathVariable Long id){return contratService.GetContratTypeById(id);}
    @GetMapping(path="/contrat/getByType/{type}")
    List<Contrat> getAllContratbyType(@PathVariable TypeContrat type){return contratService.GetAllContratByType(type);}
    @PutMapping(path="/contrat")
    Contrat updateContrat(@RequestBody Contrat contrat){return contratService.UpdateContrat(contrat);}
*/}
