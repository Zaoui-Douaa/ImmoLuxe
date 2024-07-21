package com.example.immoluxe.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="properties_table")
public class Property {

 public Property() {}

 public Property(String adresse, String type, double price, int bedrooms, int bathrooms, double area, String description, String photoUrl) {
  this.adresse = adresse;
  this.type = type;
  this.price = price;
  this.bedrooms = bedrooms;
  this.bathrooms = bathrooms;
  this.area = area;
  this.description = description;
  this.photoUrl = photoUrl;
 }

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;


 private String adresse;
 private String type;
 private double price;
 private int bedrooms;
 private int bathrooms;
 private double area;
 private String description;
 private String photoUrl;  // new field for the photo URL

 @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
 @JsonIgnore
 private List<Click> clicks;

 // getters and setters
 public Long getId() {
  return id;
 }

 public void setId(Long id) {
  this.id = id;
 }

 public String getAdresse() {
  return adresse;
 }

 public void setAdresse(String adresse) {
  this.adresse = adresse;
 }

 public String getType() {
  return type;
 }

 public void setType(String type) {
  this.type = type;
 }

 public double getPrice() {
  return price;
 }

 public void setPrice(double price) {
  this.price = price;
 }

 public int getBedrooms() {
  return bedrooms;
 }

 public void setBedrooms(int bedrooms) {
  this.bedrooms = bedrooms;
 }

 public int getBathrooms() {
  return bathrooms;
 }

 public void setBathrooms(int bathrooms) {
  this.bathrooms = bathrooms;
 }

 public double getArea() {
  return area;
 }

 public void setArea(double area) {
  this.area = area;
 }

 public String getDescription() {
  return description;
 }

 public void setDescription(String description) {
  this.description = description;
 }

 public String getPhotoUrl() {
  return photoUrl;
 }

 public void setPhotoUrl(String photoUrl) {
  this.photoUrl = photoUrl;
 }

 public List<Click> getClicks() {
  return clicks;
 }

 public void setClicks(List<Click> clicks) {
  this.clicks = clicks;
 }
}

