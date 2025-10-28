package com.compliancehub.controller;

import com.compliancehub.utils.Locations;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/locations")

public class LocationsController {

    @GetMapping
    Set<String> getAllLocations() {
        return Locations.locations;
    }

    // Returnere alle lande som indeholder den streng der kommer ind. gør det muligt at søge.
    @GetMapping("/{name}")
    List<String> getLocationsWhereNameIs(@PathVariable String name) {
        List<String> newArr = new ArrayList<>();
        return Locations.locations.stream()
                .filter(loc -> loc.contains(name.toUpperCase()))
                .toList();
    }

}

