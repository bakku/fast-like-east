package dev.bakku.fastlikeeast.scraper

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    if (args.isEmpty()) {
        println("usage: scaper <YEAR>")
        exitProcess(-1)
    }

    val year = args[0].toInt()
    val scraper = FastingDaysScraper(DefaultFastingHttpClient())

    val fastingDays = (1..12).flatMap {
        scraper.getFastingDays(it, year)
    }

    val json = Json {
        prettyPrint = true
    }

    println(json.encodeToString(fastingDays))
}