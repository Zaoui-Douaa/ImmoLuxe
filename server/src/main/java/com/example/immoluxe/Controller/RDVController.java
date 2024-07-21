package com.example.immoluxe.Controller;

import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Entity.RDV;
import com.example.immoluxe.Service.IPropertyService;
import com.example.immoluxe.Service.IRDVService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class RDVController {
    IRDVService irdvService;
    @PostMapping(path = "/rdv")
    RDV ajouterRdv(@RequestBody RDV rdv) {
        return irdvService.AddRdv(rdv);
    }
}