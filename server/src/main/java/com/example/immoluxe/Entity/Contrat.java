package com.example.immoluxe.Entity;

import com.example.immoluxe.Common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Contrat extends BaseEntity {

    @Enumerated(EnumType.STRING)
    TypeContrat typeContrat;

    Date dateDebut;

    Date dateFin;

    double montant;
}

