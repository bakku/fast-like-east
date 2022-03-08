import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.6.0"
    kotlin("plugin.serialization") version "1.6.0"
    application
}

group = "dev.bakku"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("it.skrape:skrapeit:1.2.1")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.2")
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile>() {
    kotlinOptions.jvmTarget = "1.8"
}

application {
    mainClass.set("dev.bakku.fastlikeeast.scraper.MainKt")
}