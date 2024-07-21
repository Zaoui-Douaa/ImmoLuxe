package com.example.immoluxe.Service;

import com.example.immoluxe.Entity.RDV;
import com.example.immoluxe.Repository.RDVRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RDVServiceImp implements IRDVService {
    RDVRepository rdvRepo;
    @Override
    public RDV AddRdv(RDV rdv)
    {
        return rdvRepo.save(rdv);
    }
}
