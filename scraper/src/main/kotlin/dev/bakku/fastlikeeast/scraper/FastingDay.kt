package dev.bakku.fastlikeeast.scraper

import kotlinx.serialization.Serializable

enum class FastingType { CHEESE, FISH, WINE, STRICT }

@Serializable
data class FastingDay(val date: String, val type: FastingType)